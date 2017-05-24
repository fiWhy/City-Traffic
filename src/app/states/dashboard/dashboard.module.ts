import * as angular from "angular";

import { Dashboard } from "./dashboard.component";

export const DashboardModule: ng.IModule = angular.module("app.states.dashboard", [])
    .component(Dashboard.selector, Dashboard);
