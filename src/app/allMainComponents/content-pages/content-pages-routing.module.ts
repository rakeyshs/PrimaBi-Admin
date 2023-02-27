import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddPagesComponent } from "./add-pages/add-pages.component";
import { UserViewComponent } from "./pages-detail/dialogs/user-view/user-view.component";
import { PagesDetailComponent } from "./pages-detail/pages-detail.component";

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
    path: "user-view/:keyword",
    component: UserViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule {}
