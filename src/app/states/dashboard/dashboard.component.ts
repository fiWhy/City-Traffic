import { IAuthProvider } from "../../core/providers";
import { Contribution } from "../../core/entities";

export class DashboardController {
    static $inject = ["AuthProvider"];
    private selectedDirection: Contribution;
    constructor(private AuthProvider: IAuthProvider) { }

    private directionSelected(direction: Contribution) {
        this.selectedDirection = new Contribution(direction);
    }
}
export const Dashboard = {
    selector: "dashboard",
    controller: DashboardController,
    controllerAs: "Dashboard",
    template: require("./dashboard.html"),
};