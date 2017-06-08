import * as angular from "angular";

import { ServicesModule } from "./services/services.module";
import { coreConstants } from "./core.constants";

export const CoreModule = angular.module("app.core", [
    ServicesModule.name
])
    .constant("CoreConstants", coreConstants());