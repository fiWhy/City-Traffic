import * as angular from "angular";
import * as firebase from "firebase";

import { TopBar, SideNav } from "./components";

import { materialConfig, routesConfig, firebaseConfig } from "./config";

import { StatesModule } from "./states";
import { SharedModule } from "./shared";
import { CoreModule } from "./core";

import { routes } from "./app.route";

import { AppService } from "./app.service";

firebase.initializeApp(firebaseConfig());

angular.module("app", [
    "ui.router",
    "ngMaterial",
    "ngMdIcons",
    "firebase",
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