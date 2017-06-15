import { MdGoogleAutocompleteService } from "./md-google-autocomplete.service";
import { map, isEqual } from "lodash";

class MdGoogleAutocompleteController implements ng.IController {
    static $inject = ["MdGoogleAutocompleteService", "$timeout", "$scope"];
    private selectedItem: any;
    private searchText: string;
    private oldSearchText: string;
    private queryResults: any[] = [];
    private ngModel: any;
    private location: google.maps.LatLng;
    private radius: number;
    private currentLocation: google.maps.LatLng | string;
    private bounds: google.maps.LatLngBounds;
    constructor(private MdGoogleAutocompleteService: MdGoogleAutocompleteService,
        private $timeout: ng.ITimeoutService,
        private $scope: ng.IScope, ) {
    }

}

export const MdGoogleAutocomplete = {
    selector: "mdGoogleAutocomplete",
    controller: MdGoogleAutocompleteController,
    controllerAs: "MdGoogleAutocomplete",
    template: require("./md-google-autocomplete.html"),
    bindings: {
        label: "@",
        placeholder: "@",
        isDisabled: "<",
        noCache: "<",
        visibleModel: "=",
        ngModel: "=",
        placeChange: "&",
        onError: "&",
        required: "=",
        location: "<",
        currentLocation: "<",
        radius: "<",
        bounds: "<",
    },
};