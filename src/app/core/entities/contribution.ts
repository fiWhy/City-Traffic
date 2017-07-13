export interface  ILocation {
    lat: number;
    lng: number;
}

export class Contribution {
    public startTime: Date;
    public title: string;
    public endTime: Date;
    public startPoint: google.maps.LatLng;
    public endPoint: google.maps.LatLng;
    public additional: google.maps.LatLng[];
    public userId: any;
    constructor({ title, startTime, endTime, startPoint, endPoint, additional }) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startPoint = this.preparePoint(startPoint);
        this.endPoint = this.preparePoint(endPoint);
        this.additional = additional ? additional.map((point) => this.prepareWayPoint(point)) : [];
    }
    private prepareWayPoint(point: ILocation) {
        return {
            location: {
                lat: point.lat,
                lng: point.lng,
            },
            stopover: false,
        };
    }

    private preparePoint(location: ILocation) {
        return new google.maps.LatLng(location.lat, location.lng);
    }
}