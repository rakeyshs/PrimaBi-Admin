import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { MenuSubMenuService } from "../../menu-sub-menu.service";
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { MenuSubMenuModel } from "../../menu-sub-menu.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class FormDialogComponent {
  action: string;
  actionData: string;
  dialogTitle: string;
  parentOption: string;
  advanceTableForm: UntypedFormGroup;
  advanceTable: MenuSubMenuModel;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: MenuSubMenuService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    this.actionData = this.action;
    this.parentOption = this.actionData == "edit" ? "Parent" : "Make Parent";

    if (this.action === "edit") {
      this.dialogTitle = data.advanceTable.menuName;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = "New Record";
      this.advanceTable = new MenuSubMenuModel({});
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
      menuId: [this.advanceTable.menuId],
      menuName: [this.advanceTable.menuName],
      menuDescription: [this.advanceTable.menuDescription],
      parentId: [this.advanceTable.parentId, [Validators.required]],
      sequenceNo: [this.advanceTable.sequenceNo, [Validators.required]],
      url: [this.advanceTable.url, [Validators.required]],
      icon: [this.advanceTable.icon, [Validators.required]],
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
