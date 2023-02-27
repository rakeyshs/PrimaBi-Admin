import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSortModule } from "@angular/material/sort";
import { MatStepperModule } from "@angular/material/stepper";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxMaskModule } from "ngx-mask";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedModule } from "src/app/shared/shared.module";
import { AddPagesComponent } from "./add-pages/add-pages.component";
import { PagesDetailComponent } from "./pages-detail/pages-detail.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { PagesService } from "./pages.service";
import { DeleteDialogComponent } from "./pages-detail/dialogs/delete-dialog/delete-dialog.component";
import { FormDialogComponent } from "./pages-detail/dialogs/form-dialog/form-dialog.component";
import { ViewPageComponent } from "./view-page/view-page.component";

@NgModule({
  declarations: [
    AddPagesComponent,
    PagesDetailComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    ViewPageComponent,
  ],
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    ComponentsModule,
    CKEditorModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSortModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxMaskModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [PagesService],
})
export class ContentPagesModule {}
