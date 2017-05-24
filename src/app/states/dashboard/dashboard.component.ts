export class DashboardController {
    static $inject = [];
    constructor() { }
}
export const Dashboard = {
    selector: "dashboard",
    controller: DashboardController,
    controllerAs: "Dashboard",
    template: require("./dashboard.html"),
};