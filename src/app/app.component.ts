import "./app.scss";
export class AppController {
    static $inject = ["$rootScope"];
    private leftSideNavId: string = "leftNav";
    constructor(
        private $rootScope: ng.IScope,
    ) { }
}

export const App = {
    selector: "app",
    controller: AppController,
    controllerAs: "App",
    template: require("./app.html"),
    bindings: {},
};