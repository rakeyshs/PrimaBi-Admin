import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MenuSubMenuRoutingModule } from "./menu-sub-menu-routing.module";
import { MenuSubMenuComponent } from "./menu-sub-menu.component";
import { DeleteDialogComponent } from "./dialogs/delete-dialog/delete-dialog.component";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MenuSubMenuService } from "./menu-sub-menu.service";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    MenuSubMenuComponent,
    DeleteDialogComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    MenuSubMenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [MenuSubMenuService],
})
export class MenuSubMenuModule {}
