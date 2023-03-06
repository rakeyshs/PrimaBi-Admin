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
export class FormDialogComponent {}
