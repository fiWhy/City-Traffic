import * as angular from "angular";

import { App } from "./app.component";

import { materialConfig } from "./config";

import "./app.scss";

angular.module("app", [
    "ngMaterial",
    "ngMdIcons",
])
    .config(materialConfig)
    .component(App.selector, App);

angular.bootstrap(document.getElementById("app"), ["app"]);