import * as angular from "angular";

import { App } from "./app.component";

angular.module("app", [
    
]).component(App.selector, App);

angular.bootstrap(document.getElementById("app"), ["app"]);