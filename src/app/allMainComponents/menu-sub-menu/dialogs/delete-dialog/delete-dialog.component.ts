import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

import { MenuSubMenuService } from "../../menu-sub-menu.service";

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.sass"],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: MenuSubMenuService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.advanceTableService.deleteAdvanceTable(this.data.menuId);
  }
}
