import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { MenuSubMenuModel } from "./menu-sub-menu.model";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Injectable()
@Injectable({
  providedIn: "root",
})
export class MenuSubMenuService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = "assets/data/advanceTable.json";

  url = "https://api.primabi.co/api/v1/";

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
    return this.httpClient.get(this.url + "menu");
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
      .get<MenuSubMenuModel[]>(this.url + "menu")
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

    this.httpClient.post(this.url + "menu/add", advanceTable).subscribe(
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
      .post(this.url + "menu/update/" + advanceTable.menuId, advanceTable)
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
    return this.httpClient.post(this.url + "menu/delete/" + id, id).subscribe(
      (data) => {},
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
    // return this.httpClient.delete(this.url + "menu/" + id).subscribe(
    //   (data) => {
    //     alert(this.url + "menu" + id);
    //     console.log(id);
    //   },
    //   (err: HttpErrorResponse) => {
    //     // error code here
    //   }
    // );
  }
}
