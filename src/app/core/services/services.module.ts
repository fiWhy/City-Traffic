import * as angular from "angular";

import { GeoService, ToastService } from "./";

export const ServicesModule = angular.module("app.core.services", [
])
    .service("GeoService", GeoService)
    .service("ToastService", ToastService);