import * as angular from "angular";

import { GeoService } from "./";

export const ServicesModule = angular.module("app.core.services", [
])
    .service("GeoService", GeoService);