import * as angular from "angular";

import { DashboardModule } from "./dashboard";
import { ContributingModule } from "./contributing";

export const StatesModule: ng.IModule = angular.module("app.states", [
    DashboardModule.name,
    ContributingModule.name,
]);