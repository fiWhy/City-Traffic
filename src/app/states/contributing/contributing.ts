import { ContributingService } from "./contributing.service";
import { GeoService } from "../../core/services";


export interface IFormData {
    title: string;
    startPoint: google.maps.GeocoderResult;
    endPoint: google.maps.GeocoderResult;
    additional?: google.maps.GeocoderResult[];
}

export class Contributing {
    static $inject = ["ContributingService", "GeoService", "$state"];
    public contributeFormData: IFormData;
    public currentLocation: google.maps.LatLng;
    constructor(private ContributingService: ContributingService,
        private GeoService: GeoService,
        private $state: ng.ui.IStateService) {
        this.contributeFormData = {
            title: "",
            startPoint: null,
            endPoint: null,
            additional: [],
        };
    }

    public contribute() {
    }

    private pointChanged(pointKey: string, point: google.maps.GeocoderResult) {
        // console.log(pointKey, this.contributeFormData[pointKey]);
    }

    private handleError(error) {
        alert(error);
    }

    private addAdditionalPoint() {
        this.contributeFormData.additional.push(null);
    }

    private removeAdditionalPoint(index: number) {
        this.contributeFormData.additional.splice(index, 1);
    }
}