import "./traffic-map.scss";
import { Contribution } from "../../../../core/entities";

export class TrafficMapController {
    static $inject = ["NgMap", "$scope"];
    private zoom: number;
    private center: any;
    private defaultZoom: number = 10;
    private preparedDirection: any;
    constructor(private NgMap,
        private $scope: ng.IScope, ) {
        this.setWatchers();
    }

    private setWatchers() {
        this.$scope.$watch("TrafficMap.center", (val: google.maps.LatLng) => this.backToCenter(val));
        this.$scope.$watch("TrafficMap.direction", (val: Contribution) => {
            if (val) {
                this.prepareDirection(val);
            } else {
                return;
            }
        });
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

    private prepareDirection(direction: Contribution) {
        this.preparedDirection = {
            origin: `${direction.startPoint.lat()}, ${direction.startPoint.lng()}`,
            destination: `${direction.endPoint.lat()}, ${direction.endPoint.lng()}`,
            waypoints: direction.additional
        };
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
        direction: "<",
    },
};