import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./authentication/page404/page404.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./allMainComponents/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "menu-subMenu",
        loadChildren: () =>
          import("./allMainComponents/menu-sub-menu/menu-sub-menu.module").then(
            (m) => m.MenuSubMenuModule
          ),
        // import("./advance-table/advance-table.module").then(
        //   (m) => m.AdvanceTableModule
        // ),
      },
      {
        path: "add-pages",
        loadChildren: () =>
          import("./add-pages/add-pages-routing.module").then(
            (m) => m.AddPagesRoutingModule
          ),
      },
      {
        path: "content-pages",
        loadChildren: () =>
          import("./allMainComponents/content-pages/content-pages.module").then(
            (m) => m.ContentPagesModule
          ),
      },
      {
        path: "multilevel",
        loadChildren: () =>
          import("./multilevel/multilevel.module").then(
            (m) => m.MultilevelModule
          ),
      },
    ],
  },
  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
