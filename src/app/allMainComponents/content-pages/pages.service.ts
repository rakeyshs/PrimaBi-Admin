import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { addPagesModle } from "./pages.modle";
import { ApiConstant } from "src/app/API/api-constants";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { subPages } from "./sub-pages.modle";

@Injectable()
@Injectable({
  providedIn: "root",
})
export class PagesService extends UnsubscribeOnDestroyAdapter {
  API_URL = ApiConstant.ROOT_URL;
  isTblLoading = true;
  dataChange: BehaviorSubject<addPagesModle[]> = new BehaviorSubject<
    addPagesModle[]
  >([]);

  isTblLoading1 = true;

  dataChange1: BehaviorSubject<subPages[]> = new BehaviorSubject<subPages[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private http: HttpClient, private route: Router) {
    super();
  }
  get data1() {
    return this.http.get(this.API_URL + "content-page");
  }

  getSubPagesList(id: number) {
    return this.http.get(this.API_URL + "content-page/get-subpage/" + id);
  }

  get data(): addPagesModle[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  // getContentPageData() {
  //   this.http.get(this.API_URL + "content-page").subscribe(
  //     (data) => {},
  //     (err: HttpErrorResponse) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // attachment/upload

  getContentPageData(): void {
    this.subs.sink = this.http
      .get<addPagesModle[]>(this.API_URL + "content-page")
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

  addContentPage(advanceTable: addPagesModle): void {
    // this.dialogData = advanceTable;

    this.http.post(this.API_URL + "content-page/add", advanceTable).subscribe(
      (data) => {
        this.route.navigateByUrl("content-pages/pages-details");
        Swal.fire({
          icon: "success",
          title: "Your pages is added Successfully",
          showConfirmButton: false,
          timer: 3000,
        });
      },
      (err: HttpErrorResponse) => {
        // error code here
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    );
  }

  FileAttachmentsUpload(root: any) {
    let formData = new FormData();
    if (root != null) {
      for (let i = 0; i < root.length; i++) {
        formData.append("file", root[i]);
      }
    }

    return this.http.post(this.API_URL + "attachment/upload", formData);
  }

  viewDetails(keyword: any) {
    return this.http.get(this.API_URL + "content-page/" + keyword);
  }

  updateAdvanceTable(advanceTable: addPagesModle): void {
    this.dialogData = advanceTable;

    this.http
      .post(
        this.API_URL + "content-page/update/" + advanceTable.pageId,
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
    return this.http
      .post(this.API_URL + "content-page/delete/" + id, id)
      .subscribe(
        (data) => {},
        (err: HttpErrorResponse) => {
          // error code here
        }
      );
  }

  isKeywordUnique(keyword: any) {
    return this.http.get(
      this.API_URL + "content-page/is-unique-keyword/" + keyword
    );
  }

  // getSubPages(id: number) {
  //   return this.http.get(this.API_URL + "content-page/get-subpage/" + id);
  // }

  getSubPages(id: number): void {
    this.subs.sink = this.http
      .get<subPages[]>(this.API_URL + "content-page/get-subpage/" + id)
      .subscribe(
        (data) => {
          this.isTblLoading1 = false;
          this.dataChange1.next(data);
        },
        (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
      );
  }
}
