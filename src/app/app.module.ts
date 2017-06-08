import * as angular from "angular";

import { TopBar, SideNav } from "./components";

import { materialConfig, routesConfig } from "./config";

import { StatesModule } from "./states";
import { SharedModule } from "./shared";
import { CoreModule } from "./core";

import { routes } from "./app.route";

import { AppService } from "./app.service";

angular.module("app", [
    "ui.router",
    "ngMaterial",
    "ngMdIcons",
    "ngMap",
    CoreModule.name,
    SharedModule.name,
    StatesModule.name,
])
    .config(routes)
    .config(materialConfig)
    .config(routesConfig)
    .service("AppService", AppService)
    .component(TopBar.selector, TopBar)
    .component(SideNav.selector, SideNav);

angular.bootstrap(document.getElementById("app"), ["app"]);