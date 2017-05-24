import * as angular from "angular";

import { App } from "./app.component";
import { TopBar } from "./components";

import { materialConfig } from "./config";

import { StatesModule } from "./states";

import "./app.scss";

angular.module("app", [
    "ngMaterial",
    "ngMdIcons",
    "ngMap",
    StatesModule.name,
])
    .config(materialConfig)
    .component(TopBar.selector, TopBar)
    .component(App.selector, App);

angular.bootstrap(document.getElementById("app"), ["app"]);