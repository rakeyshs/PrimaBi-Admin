import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";

import { NgScrollbarModule } from "ngx-scrollbar";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgApexchartsModule } from "ng-apexcharts";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    chartjsModule,
    NgScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTooltipModule,
    NgApexchartsModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class DashboardModule {}
