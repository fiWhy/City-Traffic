import * as angular from "angular";

import { Dashboard } from "./dashboard.component";
import { TrafficMap } from "./components";

import { routes } from "./dashboard.route";

export const DashboardModule: ng.IModule = angular.module("app.states.dashboard", [])
    .config(routes)
    .component(TrafficMap.selector, TrafficMap);
