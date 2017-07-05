
import { AppService } from "./app.service";
import { ToastService } from "./core/services";

import "./app.scss";
export class AppController {
    static $inject = ["$rootScope", "AppService", "ToastService"];
    private leftSideNavId: string = "leftNav";
    constructor(
        private $rootScope: ng.IScope,
        private AppService: AppService,
        private ToastService: ToastService
    ) {
        this.getCurrentCoordinates();
    }

    private getCurrentCoordinates() {
        this.AppService.findCoordinates()
            .then((city) => {
                this.ToastService.showSimple(city.formatted_address);
                this.AppService.saveCityToUser(city);
            }).catch((error) => {
                this.ToastService.showSimple(error);
            });
    }
}

export const App = {
    selector: "app",
    controller: AppController,
    controllerAs: "App",
    template: require("./app.html"),
    bindings: {},
};