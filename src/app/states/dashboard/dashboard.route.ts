import { DashboardController as Dashboard } from "./dashboard.component";

export const routes = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
    $urlRouterProvider.otherwise("/");
    $stateProvider.state("app.dashboard", {
        url: "/dashboard",
        parent: "app",
        template: require("./dashboard.html"),
        controller: Dashboard,
        controllerAs: "Dashboard"
    });
};