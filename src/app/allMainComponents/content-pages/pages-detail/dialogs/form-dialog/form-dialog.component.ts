import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { PagesService } from "../../../pages.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";

import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { addPagesModle } from "../../../pages.modle";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent {
  action: string;
  actionData: string;
  dialogTitle: string;
  parentOption: string;
  advanceTable:addPagesModle;
  advanceTableForm: UntypedFormGroup;
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
      title: [this.advanceTable.title],
      keyword: [this.advanceTable.keyword],
      description: [this.advanceTable.description],
      ppTpath: [this.advanceTable.ppTpath, [Validators.required]],
      videoImage: [this.advanceTable.videoImage, [Validators.required]],
      videoURL: [this.advanceTable.videoURL, [Validators.required]],
      snapshot: [this.advanceTable.snapshot, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
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

