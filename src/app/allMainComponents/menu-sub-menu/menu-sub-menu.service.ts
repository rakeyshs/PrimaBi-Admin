import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { MenuSubMenuModel } from "./menu-sub-menu.model";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";

import { ApiConstant } from "src/app/API/api-constants";

@Injectable()
@Injectable({
  providedIn: "root",
})
export class MenuSubMenuService extends UnsubscribeOnDestroyAdapter {
  API_URL = ApiConstant.ROOT_URL;

  isTblLoading = true;
  dataChange: BehaviorSubject<MenuSubMenuModel[]> = new BehaviorSubject<
    MenuSubMenuModel[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }

  get data1() {
    return this.httpClient.get(this.API_URL + "menu");
  }
  get data(): MenuSubMenuModel[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAdvanceTables(): void {
    this.subs.sink = this.httpClient
      .get<MenuSubMenuModel[]>(this.API_URL + "menu")
      .subscribe(
        (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
  }
  addAdvanceTable(advanceTable: MenuSubMenuModel): void {
    // this.dialogData = advanceTable;

    this.httpClient.post(this.API_URL + "menu/add", advanceTable).subscribe(
      (data) => {
        this.dialogData = advanceTable;
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
  updateAdvanceTable(advanceTable: MenuSubMenuModel): void {
    this.dialogData = advanceTable;

    this.httpClient
      .post(this.API_URL + "menu/update/" + advanceTable.menuId, advanceTable)
      .subscribe(
        (data) => {
          this.dialogData = advanceTable;
        },
        (err: HttpErrorResponse) => {
          // error code here
        }
      );
  }
  deleteAdvanceTable(id: number) {
    return this.httpClient
      .post(this.API_URL + "menu/delete/" + id, id)
      .subscribe(
        (data) => {},
        (err: HttpErrorResponse) => {
          // error code here
        }
      );
  }
}
