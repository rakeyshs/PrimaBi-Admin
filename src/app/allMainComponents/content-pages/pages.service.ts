import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { addPagesModle } from "./pages.modle";
import { ApiConstant } from "src/app/API/api-constants";
import {
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";

@Injectable()
@Injectable({
  providedIn: "root",
})
export class PagesService extends UnsubscribeOnDestroyAdapter {
  API_URL = ApiConstant.ROOT_URL;
  url="https://api.primabi.co/";
  isTblLoading = true;
  dataChange: BehaviorSubject<addPagesModle[]> = new BehaviorSubject<
    addPagesModle[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private http: HttpClient, private route: Router) {
    super();
  }
  get data1() {
    return this.http.get(this.API_URL + "content-page");
  }

  // //user view
  userview(keyword:string): Observable<addPagesModle> {
    console.log("user"+keyword);
    return this.http.get<addPagesModle>(this.API_URL +'content-page/'+keyword);
    }
  get data(): addPagesModle[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  // attachment/upload


  fileUpload(data:any)
{

  let formData = new FormData();

 formData.append("file",data[0]);

  return this.http.post(this.API_URL +'attachment/upload',formData) ;


}

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
          timer: 1500,
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

    return this.http.post(this.API_URL + "", formData);
  }


//delete api calling
  deleteAdvanceTable1(pageId: number) {
    return this.http.post(this.url + "delete/" +pageId,pageId).subscribe(
      (data) => {},
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  
  }
  addAdvanceTable1(advanceTable: any): void {
    // this.dialogData = advanceTable;

    this.http.post(this.API_URL + "", advanceTable).subscribe(
      (data) => {
        this.dialogData = advanceTable;
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
  updateAdvanceTable1(advanceTable: any): void {
    this.dialogData = advanceTable;

    this.http
      .post(this.API_URL + "" + advanceTable.pageId, advanceTable)
      .subscribe(
        (data) => {
          this.dialogData = advanceTable;
        },
        (err: HttpErrorResponse) => {
          // error code here
        }
      );
  }

}
