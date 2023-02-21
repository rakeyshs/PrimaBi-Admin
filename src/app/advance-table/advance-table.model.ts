import { formatDate } from "@angular/common";
export class AdvanceTable {
  menuId: number;
  menuName: string;
  menuDescription: string;
  parentId: number;
  sequenceNo: number;
  url: string;
  icon: string;

  constructor(advanceTable) {
    {
      this.menuId = advanceTable.menuId || "";
      this.menuName = advanceTable.menuName || "";
      this.menuDescription = advanceTable.menuDescription || "";
      this.parentId = advanceTable.parentId || "";
      this.sequenceNo = advanceTable.sequenceNo || "";
      this.url = advanceTable.url || "";
      this.icon = advanceTable.icon || "";
    }
  }

  // public getRandomID(): string {
  //   const S4 = () => {
  //     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  //   };
  //   return S4() + S4();
  // }
}
