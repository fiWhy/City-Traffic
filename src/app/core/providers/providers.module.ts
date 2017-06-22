import * as angular from "angular";

import { AuthProvidersModule } from "./";

export const ProvidersModule = angular.module("app.core.providers", [
    AuthProvidersModule.name,
]);