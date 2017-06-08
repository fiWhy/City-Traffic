import { filter, every } from "lodash";

export class GeoService {
    public currentPosition: Position;
    private geocoderService: google.maps.Geocoder;
    private geocodeErrorStatuses: Set<google.maps.GeocoderStatus>;

    constructor() {
        this.prepareErrors();
        this.geocoderService = new google.maps.Geocoder();
    }

    public getCurrentCoordinates(): Promise<Position> {
        return new Promise((resolve, reject) => {
            if (!this.currentPosition) {
                this.askNavigator((pos) => {
                    resolve(pos);
                }, (err) => {
                    reject(err.message);
                });
            } else {
                resolve(this.currentPosition);
            }
        });
    }

    public getCity(pos: Position): Promise<google.maps.GeocoderResult> {
        const latLng = this.positionToLatLng(pos);
        return this.askGeocoder({ location: latLng }, ["administrative_area_level_1"])
            .then((data: google.maps.GeocoderResult[]) => {
                if (data.length) {
                    return data[0];
                } else {
                    throw new Error("No location was found!");
                }
            });
    }

    public askGeocoder(options: google.maps.GeocoderRequest, types?: string[]): Promise<google.maps.GeocoderResult[]> {
        return new Promise((resolve, reject) => {
            this.geocoderService.geocode(options, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                if (this.geocodeErrorStatuses.has(status)|| !results.length) {
                    reject(results);
                } else {
                    const chosenAdddresses = this.chooseLocationByType(results, types);
                    resolve(chosenAdddresses);
                }
            });
        });
    }

    public positionToLatLng(pos: Position, types?: string[]): google.maps.LatLng {
        return new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    }

    private askNavigator(successCallback: PositionCallback, errorCallback: PositionErrorCallback): void {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    private prepareErrors() {
        this.geocodeErrorStatuses = new Set([
            google.maps.GeocoderStatus.ERROR,
            google.maps.GeocoderStatus.INVALID_REQUEST,
            google.maps.GeocoderStatus.REQUEST_DENIED,
            google.maps.GeocoderStatus.UNKNOWN_ERROR,
            google.maps.GeocoderStatus.OVER_QUERY_LIMIT,
        ]);
    }

    private chooseLocationByType(results: google.maps.GeocoderResult[], types: string[]) {
        if (types) {
            return filter<google.maps.GeocoderResult>(results, (result) => {
                return every(types, (el) => result.types.indexOf(el) !== -1);
            });
        } else {
            return results;
        }
    }
}