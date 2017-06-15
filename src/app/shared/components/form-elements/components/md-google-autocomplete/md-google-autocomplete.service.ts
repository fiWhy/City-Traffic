import { filter, every, find } from "lodash";

export class MdGoogleAutocompleteService {
    static $inject = ["$q"];
    private autocompleteErrorStatuses: Set<google.maps.places.PlacesServiceStatus>;
    private geocodeErrorStatuses: Set<google.maps.GeocoderStatus>;
    private autocompleteService: google.maps.places.AutocompleteService;
    private geocoderService: google.maps.Geocoder;
    private beforeFoundPlace: google.maps.GeocoderResult;
    private locationFoundPromise: Promise<google.maps.GeocoderResult>;
    constructor(private $q: ng.IQService) {
        this.prepareErrors();
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.geocoderService = new google.maps.Geocoder;
    }


    private prepareErrors() {
        this.autocompleteErrorStatuses = new Set([
            google.maps.places.PlacesServiceStatus.INVALID_REQUEST,
            google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT,
            google.maps.places.PlacesServiceStatus.REQUEST_DENIED,
            google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR,
        ]);

        this.geocodeErrorStatuses = new Set([
            google.maps.GeocoderStatus.ERROR,
            google.maps.GeocoderStatus.INVALID_REQUEST,
            google.maps.GeocoderStatus.REQUEST_DENIED,
            google.maps.GeocoderStatus.UNKNOWN_ERROR,
            google.maps.GeocoderStatus.OVER_QUERY_LIMIT,
        ]);
    }
}