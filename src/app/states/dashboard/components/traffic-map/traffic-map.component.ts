import "./traffic-map.scss";

export class TrafficMapController {
    static $inject = ["NgMap", "$scope"];
    private zoom: number;
    private center: google.maps.LatLng;
    private defaultZoom: number = 10;
    constructor(private NgMap,
        private $scope: ng.IScope, ) {
        this.initMap();
        this.setWatchers();
    }

    private initMap() {
        this.NgMap.getMap().then((map) => {
        });
    }

    private setWatchers() {
        this.$scope.$watch("TrafficMap.center", (val: google.maps.LatLng) => this.backToCenter(val));
        this.$scope.$watch("TrafficMap.zoom", (val: number) => this.backToZoom(val));
    }

    private setCenter(pos: google.maps.LatLng): void {
        this.NgMap.getMap().then((map) => {
            this.backToCenter(pos);
            this.backToZoom(this.zoom || this.defaultZoom);
        });
    }

    private backToCenter(center: google.maps.LatLng) {
        if (center) {
            this.NgMap.getMap().then((map) => {
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });
        }
    }

    private backToZoom(zoom: number) {
        this.NgMap.getMap().then((map) => {
            map.setZoom(zoom || this.defaultZoom);
        });
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