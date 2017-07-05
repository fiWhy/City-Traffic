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

    private selectedItemChange() {
        this.ngModel = this.selectedItem;
    }

    private getQueryResults() {
        const result = this.searchText !== this.oldSearchText ? this.searchTextChange() : Promise.resolve(this.queryResults);
        this.oldSearchText = this.searchText;
        return result;
    }

    private searchTextChange(): Promise<google.maps.places.QueryAutocompletePrediction[] | any[]> {
        if (!this.searchText) {
            return Promise.resolve([]);
        } else {
            return this.MdGoogleAutocompleteService.search(this.searchText, this.location, this.radius, this.bounds)
                .then((data) => {
                    if (!data) {
                        return this.queryResults = [];
                    } else {
                        return this.queryResults = this.adaptingAddresses(data);
                    }
                }).catch((err) => {
                    return [];
                });
        }
    }

      private adaptingAddresses(data: google.maps.places.QueryAutocompletePrediction[]): google.maps.places.QueryAutocompletePrediction[] {
        return map(data, (result) => {
            return Object.assign({}, result, {
                formatted_address: result.description
            });
        });
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