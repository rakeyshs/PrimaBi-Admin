import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

import { PagesService } from "../../../pages.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { subPages } from "../../../sub-pages.modle";


@Component({
  selector: 'app-update-content-page',
  templateUrl: './update-content-page.component.html',
  styleUrls: ['./update-content-page.component.sass']
})
export class UpdateContentPageComponent {
  public Editor =ClassicEditor;
  
  action: string;
  actionData: string;
  dialogTitle: string;
  parentOption: string;
  advanceTable:subPages;
  advanceTableForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<UpdateContentPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: PagesService,
    private fb: UntypedFormBuilder,
  
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
      // this.advanceTable = new addPagesModle({});
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
    return this.fb.group({
      heading:[this.advanceTable.heading],
      description: [this.advanceTable.description],

    });
  }
  submit() {
    // emppty stuff
  }
  selectFiles2 :any;
  getFileDetails1(e:any) {
   
    this.selectFiles2 = e.target.files;
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.actionData === "edit") {
      this.advanceTableService.updateAdvanceTable1(
        this.advanceTableForm.getRawValue()
      );
    } else {
      this.advanceTableService.addAdvanceTable1(
        this.advanceTableForm.getRawValue()
      );
    }
  }
}