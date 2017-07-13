import * as angular from "angular";

import { SharedComponentsModule } from "./components/shared-components.module";
import { SharedFiltersModule } from "./filters/shared-filters.module";

export const SharedModule: ng.IModule = angular.module("app.shared", [
    SharedComponentsModule.name,
    SharedFiltersModule.name
]);

