import * as angular from "angular";

import { ServicesModule } from "./services/services.module";
import { ProvidersModule } from "./providers/providers.module";
import { coreConstants } from "./core.constants";

export const CoreModule = angular.module("app.core", [
    ServicesModule.name,
    ProvidersModule.name,
])
    .constant("CoreConstants", coreConstants());