import { IAuthProvider } from "../../core/providers";

export class DashboardController {
    static $inject = ["AuthProvider"];
    constructor(private AuthProvider: IAuthProvider) { }
}
export const Dashboard = {
    selector: "dashboard",
    controller: DashboardController,
    controllerAs: "Dashboard",
    template: require("./dashboard.html"),
};