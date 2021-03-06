import { GeoService, ToastService } from "./core/services";
import { IAuthProvider, IRequestProvider } from "./core/providers";
import { User } from "./core/entities/user";

export class AppService {
    static $inject = ["AuthProvider", "RequestProvider", "GeoService", "CoreConstants", "ToastService"];
    constructor(private AuthProvider: IAuthProvider,
        private RequestProvider: IRequestProvider<User>,
        private GeoService: GeoService,
        private CoreConstants,
        private ToastService: ToastService) { }

    connect($scope: ng.IScope): Promise<boolean> {
        return this.AuthProvider.connect($scope);
    }

    findCoordinates() {
        return this.GeoService.getCurrentCoordinates()
            .then((pos: Position) => this.GeoService.getCity(pos));
    }

    saveCityToUser(city: google.maps.GeocoderResult) {
        if (this.user) {
            const latLng = city.geometry.location;
            const sw = city.geometry.bounds.getSouthWest();
            const ne = city.geometry.bounds.getNorthEast();
            const updates = {
                location: {
                    location: { lat: latLng.lat(), lng: latLng.lng() },
                    bounds: {
                        sw: { lat: sw.lat(), lng: sw.lng() },
                        ne: { lat: ne.lat(), lng: ne.lng() },
                    },
                },
                placeId: city.place_id,
            };
            Object.assign(this.user, updates);
            Object.assign(this.user, new User(this.user));
            this.RequestProvider.patch(`users/${this.AuthProvider.currentUser.id}`, updates);
        } else {
            return;
        }
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