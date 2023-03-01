import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Page404Component } from "src/app/authentication/page404/page404.component";
import { AddPagesComponent } from "./add-pages/add-pages.component";
import { EditSubPageComponent } from "./edit-sub-page/edit-sub-page.component";
import { PagesDetailComponent } from "./pages-detail/pages-detail.component";
import { ViewPageComponent } from "./view-page/view-page.component";

const routes: Routes = [
  {
    path: "add-pages",
    component: AddPagesComponent,
  },
  {
    path: "pages-details",
    component: PagesDetailComponent,
  },
  {
    path: ":keyword",
    component: ViewPageComponent,
  },
  {
    path: "edit-sub-page/:id",
    component: EditSubPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule {}
