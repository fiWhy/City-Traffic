import { IMenuItem } from "../providers/nav-bar.service.provider";

export class NavBarServiceImplementation {
    private _menuItems: IMenuItem[] = [];

    public registerItems(menuItems: IMenuItem[]) {
        this._menuItems = menuItems;
    }

    public fetchMenuItems(): IMenuItem[] {
        return this._menuItems.sort((prev, next) => {
            return prev.order - next.order;
        });
    }
}