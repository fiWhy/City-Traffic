import { ContributingService } from "./contributing.service";
import { GeoService, ToastService } from "../../core/services";
import { IAuthProvider } from "../../core/providers";

import "./contributing.scss";

export interface IFormData {
    title: string;
    startPoint: google.maps.GeocoderResult;
    endPoint: google.maps.GeocoderResult;
    additional?: google.maps.GeocoderResult[];
}

export class Contributing {
    static $inject = ["ContributingService", "AuthProvider", "GeoService", "ToastService", "$state"];
    public contributeFormData: IFormData;
    public currentLocation: google.maps.LatLng;
    constructor(private ContributingService: ContributingService,
        private AuthProvider: IAuthProvider,
        private GeoService: GeoService,
        private ToastService: ToastService,
        private $state: ng.ui.IStateService) {
        this.contributeFormData = {
            title: "",
            startPoint: null,
            endPoint: null,
            additional: [],
        };
    }

    public contribute() {
        this.validate(this.contributeFormData)
            .then((data) => {
                console.log("Contributing", data);
                this.ContributingService.contribute(this.contributeFormData)
                    .then(() => {
                        this.$state.go("app.dashboard");
                    });
            }).catch(e => {
                this.ToastService.showSimple(e);
            });
    }

    private validate(data: IFormData): Promise<IFormData> {
        return new Promise((resolve, reject) => {
            if ((!data.startPoint || !data.startPoint.place_id) || (!data.endPoint || !data.endPoint.place_id)) {
                reject("You need to pick google map item");
            } else {
                resolve(data);
            }
        });
    }

    private pointChanged(pointKey: string, point: google.maps.GeocoderResult) {
        // console.log(pointKey, this.contributeFormData[pointKey]);
    }

    private handleError(error) {
        this.ToastService.showSimple(error);
    }

    private addAdditionalPoint() {
        this.contributeFormData.additional.push(null);
    }

    private removeAdditionalPoint(index: number) {
        this.contributeFormData.additional.splice(index, 1);
    }
}