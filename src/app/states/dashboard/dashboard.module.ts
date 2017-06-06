import * as angular from "angular";

import { Dashboard } from "./dashboard.component";
import { TrafficMap } from "./components";

import { routes } from "./dashboard.route";
import { menu } from "./config/menu.config";

export const DashboardModule: ng.IModule = angular.module("app.states.dashboard", [])
    .config(routes)
    .config(menu)
    .component(TrafficMap.selector, TrafficMap);
