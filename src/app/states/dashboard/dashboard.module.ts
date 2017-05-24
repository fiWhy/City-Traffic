import * as angular from "angular";

import { Dashboard } from "./dashboard.component";
import { TrafficMap } from "./components";

export const DashboardModule: ng.IModule = angular.module("app.states.dashboard", [])
    .component(TrafficMap.selector, TrafficMap)
    .component(Dashboard.selector, Dashboard);
