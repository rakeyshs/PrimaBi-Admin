import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlankComponent } from "./blank/blank.component";
import { PagesTableComponent } from "./pages-table/pages-table.component";
import { AddPagesComponent } from "./add-pages/add-pages.component";

const routes: Routes = [
  {
    path: "blank",
    component: BlankComponent,
  },
  {
    path: "add-pages",
    component: AddPagesComponent,
  },
  {
    path: "pages-details",
    component: PagesTableComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraPagesRoutingModule {}
