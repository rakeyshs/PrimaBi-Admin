import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuSubMenuComponent } from "./menu-sub-menu.component";

const routes: Routes = [
  {
    path: "",
    component: MenuSubMenuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuSubMenuRoutingModule {}
