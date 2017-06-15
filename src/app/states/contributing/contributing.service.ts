import { GeoService } from "../../core/services";
import { IFormData } from "./contributing";

export class ContributingService {
    static $inject = ["GeoService", "CoreConstants"];
    constructor(private GeoService: GeoService,
        private CoreConstants) { }
}