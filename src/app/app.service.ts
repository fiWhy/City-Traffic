import { GeoService } from "./core/services";

export class AppService {
    static $inject = ["GeoService"];
    constructor(private GeoService: GeoService) { }

    public findCoordinates() {
        return this.GeoService.getCurrentCoordinates()
            .then((pos: Position) => this.GeoService.getCity(pos));
    }
}