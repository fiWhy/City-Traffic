
import { AppService } from "./app.service";

import "./app.scss";
export class AppController {
    static $inject = ["$rootScope", "AppService"];
    private leftSideNavId: string = "leftNav";
    constructor(
        private $rootScope: ng.IScope,
        private AppService: AppService
    ) {
        this.getCurrentCoordinates();
     }

     private getCurrentCoordinates() {
         this.AppService.findCoordinates()
            .then((city) => {
                alert(city.formatted_address);
            }).catch((error) => {
                alert(error);
            })
     }
}

export const App = {
    selector: "app",
    controller: AppController,
    controllerAs: "App",
    template: require("./app.html"),
    bindings: {},
};