import { AppController as App } from "./app.component";

export const routes = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider.state("app", {
        abstract: true,
        controller: App,
        controllerAs: "App",
        template: require("./app.html"),
    });
};