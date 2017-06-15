import { filter, every, find } from "lodash";

export class MdGoogleAutocompleteService {
    private autocompleteErrorStatuses: Set<google.maps.places.PlacesServiceStatus>;
    private geocodeErrorStatuses: Set<google.maps.GeocoderStatus>;
    private autocompleteService: google.maps.places.AutocompleteService;
    private geocoderService: google.maps.Geocoder;
    private beforeFoundPlace: google.maps.GeocoderResult;
    private locationFoundPromise: Promise<google.maps.GeocoderResult>;
    constructor() {
        this.prepareErrors();
        this.autocompleteService = new google.maps.places.AutocompleteService();
        this.geocoderService = new google.maps.Geocoder;
    }

    public search(input: string, location: google.maps.LatLng, radius: number, bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral): Promise<google.maps.places.QueryAutocompletePrediction[]> {
        return new Promise((resolve, reject) => {
            const options: google.maps.places.AutocompletionRequest = this.prepareSearchOptions(input, location, radius, bounds);
            this.autocompleteService.getQueryPredictions(options, (result: google.maps.places.QueryAutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
                if (this.autocompleteErrorStatuses.has(status)) {
                    reject(result);
                } else {
                    resolve(result);
                }
            });
        })
    }

    private prepareSearchOptions(input: string,
        location: google.maps.LatLng,
        radius: number,
        bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral): google.maps.places.AutocompletionRequest {
        const options = {
            input,
        };

        if (location) {
            Object.assign(options, {
                location,
                radius,
            });
        }

        if (bounds) {
            Object.assign(options, {
                bounds,
                strictBounds: true,
            });
        }

        return options;
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