import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { MenuSubMenuService } from "src/app/allMainComponents/menu-sub-menu/menu-sub-menu.service";
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
  selector: "app-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.sass"],
})
export class EditDialogComponent {
  action: string;
  actionData: string;
  dialogTitle: string;
  parentOption: string;
  advanceTableForm: UntypedFormGroup;
  advanceTable: addPagesModle;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: MenuSubMenuService,
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
  public confirmAdd(): void {
    if (this.actionData === "edit") {
      this.advanceTableService.updateAdvanceTable(
        this.advanceTableForm.getRawValue()
      );
    } else {
      this.advanceTableService.addAdvanceTable(
        this.advanceTableForm.getRawValue()
      );
    }
  }
}
