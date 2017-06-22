import { IAuthResponse, IAuthProvider } from "./auth-providers.factory";
import { User } from "../../entities/user";

export interface IFirebaseAuthResponse extends IAuthResponse {
    user: firebase.UserInfo;
}

export class FirebaseAuthProvider implements IAuthProvider {
    static $inject = ["$firebaseAuth", "$rootScope", "$filter"];
    public currentUser: User;
    public status: boolean = false;
    private auth: any;
    private connectedScope: ng.IScope;
    constructor(
        private $firebaseAuth,
        private $rootScope: ng.IRootScopeService,
        private $filter) {
        this.auth = this.$firebaseAuth();
        this.registerListeners();
    }

    connect($scope: ng.IScope): Promise<boolean> {
        return Promise.resolve(true);
    }

    authenticate(): Promise<User> {
        const authProvider = new firebase.auth.GoogleAuthProvider();
        return this.auth.$signInWithPopup(authProvider)
            .then((result: IFirebaseAuthResponse) => {
                if (result.credential) {
                    const user = this.prepareUser(result.user);
                    return user;
                } else {
                    throw result;
                }
            });
    }

    signOut(): Promise<any> {
        return this.auth.$signOut();
    }

    getUser(): User {
        return this.currentUser;
    }

    getStatus() {
        return this.status;
    }

    private registerListeners() {
        this.auth.$onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.currentUser = new User(this.prepareUser(firebaseUser));
                this.status = true;
                this.$rootScope.$broadcast("$userAuthorized");
            } else {
                this.currentUser = null;
                this.status = false;
            }
        });
    }

    private prepareUser(user: firebase.UserInfo) {
        return {
            id: user.uid,
            providerId: user.uid,
            image: user.photoURL,
            email: user.email,
            username: user.displayName,
        };
    }
}