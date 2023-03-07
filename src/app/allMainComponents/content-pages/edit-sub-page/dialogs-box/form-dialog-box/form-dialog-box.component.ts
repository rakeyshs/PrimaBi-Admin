import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, Input } from "@angular/core";
import { SubpagesService } from "../../../subpages.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { subPages } from "../../../sub-pages.modle";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import Swal from "sweetalert2";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-form-dialog-box",
  templateUrl: "./form-dialog-box.component.html",
  styleUrls: ["./form-dialog-box.component.sass"],
})
export class FormDialogBoxComponent {
  public Editor = ClassicEditor;
  @Input() progress;
  action: string;
  pageId: number;
  actionData: string;
  dialogTitle: string;
  parentOption: string;
  advanceTableForm: UntypedFormGroup;
  advanceTable: subPages;
  constructor(
    public dialogRef: MatDialogRef<FormDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: SubpagesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    this.pageId = data.pageId;
    this.actionData = this.action;
    this.parentOption = this.actionData == "edit" ? "Parent" : "Make Parent";

    if (this.action === "edit") {
      this.dialogTitle = data.advanceTable.heading;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = "New Record";
      this.advanceTable = new subPages(0, "", "");
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
      subPageId: [this.advanceTable.subPageId],
      heading: [this.advanceTable.heading],
      description: [this.advanceTable.description],
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
      this.advanceTableService.updateAdvanceTable(
        this.advanceTableForm.getRawValue()
      );
    } else {
      this.advanceTableService.addAdvanceTable(
        this.advanceTableForm.getRawValue(),
        this.pageId
      );
    }
  }
}
