import * as angular from "angular";

import { AuthProvidersModule, RequestProvidersModule } from "./";

export const ProvidersModule = angular.module("app.core.providers", [
    AuthProvidersModule.name,
    RequestProvidersModule.name,
]);