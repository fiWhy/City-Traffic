import "./traffic-map.scss";

export class TrafficMapController {
    static $inject = ["NgMap", "$scope"];
    private zoom: number;
    private center: any;
    private defaultZoom: number = 10;
    constructor(private NgMap,
        private $scope: ng.IScope, ) {
    }

}

export const TrafficMap = {
    selector: "trafficMap",
    controller: TrafficMapController,
    controllerAs: "TrafficMap",
    template: require("./traffic-map.html"),
    bindings: {
        zoom: "<",
        center: "<",
    },
};