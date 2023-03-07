import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { subPages } from "./sub-pages.modle";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";

import { ApiConstant } from "src/app/API/api-constants";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class SubpagesService extends UnsubscribeOnDestroyAdapter {
  API_URL = ApiConstant.ROOT_URL;

  isTblLoading = true;
  dataChange: BehaviorSubject<subPages[]> = new BehaviorSubject<subPages[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  getSubPages: any;

  get data1() {
    return this.getSubPages;
  }

  getSubPagesList(pageId: number) {
    this.getSubPages = this.httpClient.get(
      this.API_URL + "content-page/get-subpage/" + pageId
    );
  }
  get data(): subPages[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAdvanceTables(pageId: number): void {
    this.subs.sink = this.httpClient
      .get<subPages[]>(this.API_URL + "content-page/get-subpage/" + pageId)
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
  addAdvanceTable(advanceTable: subPages, pageId: number): void {
    // this.dialogData = advanceTable;

    this.httpClient
      .post(this.API_URL + "content-page/add-subpage/" + pageId, advanceTable)
      .subscribe(
        (data) => {
          this.dialogData = advanceTable;
        },
        (err: HttpErrorResponse) => {
          // error code here
        }
      );
  }
  updateAdvanceTable(advanceTable: subPages): void {
    this.dialogData = advanceTable;

    this.httpClient
      .post(
        this.API_URL + "content-page/update-subpage/" + advanceTable.subPageId,
        advanceTable
      )
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
      .post(this.API_URL + "content-page/delete-subpage/" + id, id)
      .subscribe(
        (data) => {},
        (err: HttpErrorResponse) => {}
      );
  }
}
// https://api.primabi.co/api/v1/content-page/add-subpage/23
