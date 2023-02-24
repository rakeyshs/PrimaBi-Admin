import { formatDate } from "@angular/common";
export class MenuSubMenuModel {
  menuId: number;
  menuName: string;
  menuDescription: string;
  parentId: number;
  sequenceNo: number;
  url: string;
  icon: string;

  constructor(MenuSubMenu) {
    {
      this.menuId = MenuSubMenu.menuId || "";
      this.menuName = MenuSubMenu.menuName || "";
      this.menuDescription = MenuSubMenu.menuDescription || "";
      this.parentId = MenuSubMenu.parentId || "";
      this.sequenceNo = MenuSubMenu.sequenceNo || "";
      this.url = MenuSubMenu.url || "";
      this.icon = MenuSubMenu.icon || "";
    }
  }

  // public getRandomID(): string {
  //   const S4 = () => {
  //     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  //   };
  //   return S4() + S4();
  // }
}
