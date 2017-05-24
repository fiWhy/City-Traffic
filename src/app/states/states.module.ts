import * as angular from "angular";

import { DashboardModule } from "./dashboard";

export const StatesModule: ng.IModule = angular.module("app.states", [
    DashboardModule.name
]);