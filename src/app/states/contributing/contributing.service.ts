import { GeoService } from "../../core/services";
import { IRequestProvider, IAuthProvider } from "../../core/providers";
import { IFormData } from "./contributing";
import { Contribution } from "../../core/entities";

export class ContributingService {
    static $inject = ["GeoService", "CoreConstants", "RequestProvider", "AuthProvider"];
    constructor(private GeoService: GeoService,
        private CoreConstants,
        private RequestProvider: IRequestProvider<Contribution>,
        private AuthProvider: IAuthProvider) { }

    contribute(data: any) {
        const url = `${this.CoreConstants.REQUEST.ROUTES.CONTRIBUTION}/${this.AuthProvider.currentUser.placeId}`;
        const preparedData = this.prepareData(data);
        return this.RequestProvider.post(url, preparedData, { asArray: true });
    }

    private prepareData(data: IFormData) {
        const preparedData = {
            userId: null,
            title: `${data.startPoint.formatted_address} -${data.endPoint.formatted_address}`,
            startPoint: this.GeoService.exportLatLng(data.startPoint),
            endPoint: this.GeoService.exportLatLng(data.endPoint),
            additional: data.additional ? data.additional.map((add) => this.GeoService.exportLatLng(add)) : [],
        };
        preparedData.userId = this.AuthProvider.currentUser.id;
        return preparedData;
    }
}