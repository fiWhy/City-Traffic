import { GeoService, ToastService } from "./core/services";
import { IAuthProvider } from "./core/providers";
import { User } from "./core/entities/user";

export class AppService {
    static $inject = ["AuthProvider", "GeoService", "CoreConstants", "ToastService"];
    constructor(private AuthProvider: IAuthProvider,
        private GeoService: GeoService,
        private CoreConstants,
        private ToastService: ToastService) { }

    findCoordinates() {
        return this.GeoService.getCurrentCoordinates()
            .then((pos: Position) => this.GeoService.getCity(pos));
    }

    authenticate() {
        const pinPosition = this.CoreConstants.MAIN_TOAST_POSITION;
        return this.AuthProvider.authenticate()
            .then((data) => {
                this.ToastService.showSimple(`Welcome, ${data.username}`);
            }).catch((err) => {
                this.ToastService.showSimple(err.message);
            });
    }

    signOut() {
        return this.AuthProvider.signOut();
    }

    get user(): User {
        return this.AuthProvider.currentUser;
    }
}