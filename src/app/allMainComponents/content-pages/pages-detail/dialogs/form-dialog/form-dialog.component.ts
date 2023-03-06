import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { PagesService } from "../../../pages.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { addPagesModle } from "../../../pages.modle";

import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  onChange: Function;
  pptUploadPath: string[] = [];
  pptPath: any;
  videoImagePath: string[] = [];
  vdoImgPath: any;
  snapShotPath: string[] = [];
  snapShotPaths: any;
  attachmentURL = "https://api.primabi.co/uploads/";
  tempKeyword: any;
  action: string;
  actionData: string;
  dialogTitle: string;
  parentOption: string;
  advanceTableForm: UntypedFormGroup;
  advanceTable: addPagesModle;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: PagesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    this.actionData = this.action;
    this.parentOption = this.actionData == "edit" ? "Parent" : "Make Parent";

    if (this.action === "edit") {
      this.dialogTitle = data.advanceTable.title;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = "New Record";
      this.advanceTable = new addPagesModle(
        0,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        null
      );
    }
    this.advanceTableForm = this.createContactForm();
  }

  apiData: any;

  ngOnInit() {
    this.advanceTableService.data1.subscribe((data) => {
      console.warn(data);

      this.apiData = data;
    });
  }

  formControl = new UntypedFormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): UntypedFormGroup {
    console.log("contact page ");

    return this.fb.group({
      pageId: [this.advanceTable.pageId],
      title: [this.advanceTable.title],
      keyword: [this.advanceTable.keyword],
      ppTpath: [this.advanceTable.ppTpath, [Validators.required]],
      videoImage: [this.advanceTable.videoImage, [Validators.required]],
      videoURL: [this.advanceTable.videoURL, [Validators.required]],
      description: [this.advanceTable.description, [Validators.required]],
      snapshot: [this.advanceTable.snapshot, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // for files uploading path
  getpptUploadPath(e) {
    this.pptUploadPath = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.pptUploadPath.push(e.target.files[i]);
    }

    this.advanceTableService
      .FileAttachmentsUpload(this.pptUploadPath)
      .subscribe((data) => {
        console.log(data);
        this.pptPath = data;

        console.log(this.advanceTableForm.value);
      });
  }

  getvideoImagePath(e) {
    this.videoImagePath = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.videoImagePath.push(e.target.files[i]);
    }
    this.advanceTableService
      .FileAttachmentsUpload(this.videoImagePath)
      .subscribe((data) => {
        console.log(data);
        this.vdoImgPath = data;

        console.log(this.advanceTable);
        console.log(this.advanceTableForm.value);
      });
  }

  getsnapShotPath(e) {
    this.snapShotPath = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.snapShotPath.push(e.target.files[i]);
    }
    this.advanceTableService
      .FileAttachmentsUpload(this.snapShotPath)
      .subscribe((data) => {
        console.log(data);
        this.snapShotPaths = data;
      });
  }

  public confirmAdd(): void {
    console.log("edit page ");
    if (this.actionData === "edit") {
      this.advanceTableForm.value.ppTpath = this.pptPath
        ? this.attachmentURL + this.pptPath.response.slice(8)
        : this.advanceTableForm.value.ppTpath;
      this.advanceTableForm.value.videoImage = this.vdoImgPath
        ? this.attachmentURL + this.vdoImgPath.response.slice(8)
        : this.advanceTableForm.value.videoImage;
      this.advanceTableForm.value.snapshot = this.snapShotPaths
        ? this.attachmentURL + this.snapShotPaths.response.slice(8)
        : this.advanceTableForm.value.snapshot;

      this.advanceTableService.updateAdvanceTable(this.advanceTableForm.value);
    }
    console.log(this.advanceTableForm.value);
  }

  tempData: any;
  keywordCheck(keyword: any) {
    this.tempKeyword = this.advanceTableForm.value.keyword;

    this.advanceTableService.isKeywordUnique(keyword).subscribe((data) => {
      this.tempData = data;
      if (this.tempData.response == true) {
        Swal.fire({
          icon: "error",
          title: "Keyword is already exists!",
          text: "",
        });
        this.advanceTableForm.controls["keyword"].reset();
      }
    });
  }
}
