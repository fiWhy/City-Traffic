import * as angular from "angular";

import { TopBar, SideNav } from "./components";

import { materialConfig, routesConfig } from "./config";

import { StatesModule } from "./states";
import { SharedModule } from "./shared";

import { routes } from "./app.route";

angular.module("app", [
    "ui.router",
    "ngMaterial",
    "ngMdIcons",
    "ngMap",
    SharedModule.name,
    StatesModule.name,
])
    .config(routes)
    .config(materialConfig)
    .config(routesConfig)
    .component(TopBar.selector, TopBar)
    .component(SideNav.selector, SideNav);

angular.bootstrap(document.getElementById("app"), ["app"]);