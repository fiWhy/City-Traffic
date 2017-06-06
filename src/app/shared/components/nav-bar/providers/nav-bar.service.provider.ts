import { NavBarServiceImplementation } from "../services/nav-bar.service";

export interface IMenuItem {
    sref: string;
    title: string;
    name: string;
    active: boolean;
    order?: number;
}

export class NavBarServiceProvider implements ng.IServiceProvider {
    public $get(NavBarServiceImplementation: NavBarServiceImplementation): NavBarServiceImplementation {
        return NavBarServiceImplementation;
    }
}