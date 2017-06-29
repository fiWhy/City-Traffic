import { IAuthResponse, IAuthProvider } from "./auth-providers.factory";
import { FirebaseRequestProvider } from "../request-providers";
import { User } from "../../entities/user";

export interface IFirebaseAuthResponse extends IAuthResponse {
    user: firebase.UserInfo;
}

export class FirebaseAuthProvider implements IAuthProvider {
    static $inject = ["$firebaseObject", "$firebaseArray", "$firebaseAuth", "RequestProvider", "$rootScope", "$filter"];
    public currentUser: User;
    public status: boolean = false;
    private auth: any;
    private connectedScope: ng.IScope;
    private firebaseRef: any;
    private firebaseUserArrayRef: any;
    constructor(
        private $firebaseObject,
        private $firebaseArray,
        private $firebaseAuth,
        private RequestProvider: FirebaseRequestProvider<User>,
        private $rootScope: ng.IRootScopeService,
        private $filter) {
        this.firebaseRef = this.prepareFirebaseRef();
        this.firebaseUserArrayRef = this.$firebaseArray(this.firebaseRef.child("users"));
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
                    const user = this.createOrUpdateUserInFirebase(result.user);
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

    private prepareFirebaseRef() {
        return firebase.database().ref();
    }

    private createOrUpdateUserInFirebase(user: firebase.UserInfo) {
        const userRef = this.$firebaseObject(this.firebaseRef.child("users"));
        return this.getUserFromFirebase(user.uid).then((fbUser: User) => {
            const preparedUser = new User(this.prepareUser(user));
            if (!fbUser) {
                userRef[preparedUser.providerId] = preparedUser;
                userRef.$save();
            }
            return preparedUser;
        });
    }

    private getUserFromFirebase(uid: string): Promise<User> {
        return this.firebaseUserArrayRef.$loaded().then((data) => {
            const record = data.$getRecord(uid);
            if (record) {
                this.RequestProvider.patch(`users/${uid}`, {
                    lastLogin: new Date(),
                });
            };
            return record;
        });
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