import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MenuSubMenuService } from "./menu-sub-menu.service";

import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MenuSubMenuModel } from "./menu-sub-menu.model";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormDialogComponent } from "./dialogs/form-dialog/form-dialog.component";
import { DeleteDialogComponent } from "./dialogs/delete-dialog/delete-dialog.component";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";
import { SelectionModel } from "@angular/cdk/collections";

import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";

@Component({
  selector: "app-menu-sub-menu",
  templateUrl: "./menu-sub-menu.component.html",
  styleUrls: ["./menu-sub-menu.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class MenuSubMenuComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    "select",
    "menuName",
    "menuDescription",
    "parentId",
    "sequenceNo",
    "url",
    "icon",
    // "menu_order",
    // "gender",
    // "bDate",
    // "mobile",
    // "address",
    // "country",
    "actions",
  ];
  exampleDatabase: MenuSubMenuService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<MenuSubMenuModel>(true, []);
  menuId: number;
  advanceTable: MenuSubMenuModel | null;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public advanceTableService: MenuSubMenuService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  ngOnInit() {
    this.loadData();

    this.advanceTableService.data1.subscribe((data) => {
      console.warn(data);
    });
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        advanceTable: this.advanceTable,
        action: "add",
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
        // this.refreshTable();

        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
      }
    });
  }
  editCall(row) {
    this.menuId = row.menuId;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        advanceTable: row,
        action: "edit",
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.menuId === this.menuId
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.advanceTableService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.showNotification(
          "snackbar-success",
          "Edit Record Successfully...!!!",
          "bottom",
          "center"
        );
      }
    });
  }
  deleteItem(row) {
    this.menuId = row.menuId;
    // alert(this.menuId);

    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.menuId === this.menuId
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          "snackbar-danger",
          "Delete Record Successfully...!!!",
          "bottom",
          "center"
        );
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<MenuSubMenuModel>(true, []);
    });
    this.showNotification(
      "snackbar-danger",
      totalSelect + " Record Delete Successfully...!!!",
      "bottom",
      "center"
    );
  }
  public loadData() {
    this.exampleDatabase = new MenuSubMenuService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // context menu
  onContextMenu(event: MouseEvent, item: MenuSubMenuModel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
export class ExampleDataSource extends DataSource<MenuSubMenuModel> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: MenuSubMenuModel[] = [];
  renderedData: MenuSubMenuModel[] = [];
  constructor(
    public exampleDatabase: MenuSubMenuService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<MenuSubMenuModel[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllAdvanceTables();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((advanceTable: MenuSubMenuModel) => {
            const searchStr = (
              advanceTable.menuName +
              advanceTable.menuDescription +
              advanceTable.parentId +
              advanceTable.sequenceNo +
              advanceTable.url +
              advanceTable.icon
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: MenuSubMenuModel[]): MenuSubMenuModel[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "menuId":
          [propertyA, propertyB] = [a.menuId, b.menuId];
          break;
        case "menuName":
          [propertyA, propertyB] = [a.menuName, b.menuName];
          break;
        case "menuDescription":
          [propertyA, propertyB] = [a.menuDescription, b.menuDescription];
          break;
        case "parentId":
          [propertyA, propertyB] = [a.parentId, b.parentId];
          break;
        case "sequenceNo":
          [propertyA, propertyB] = [a.sequenceNo, b.sequenceNo];
          break;
        case "url":
          [propertyA, propertyB] = [a.url, b.url];
          break;
        case "icon":
          [propertyA, propertyB] = [a.icon, b.icon];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
