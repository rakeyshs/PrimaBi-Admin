import { Component } from "@angular/core";
import { PagesService } from "../pages.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-page",
  templateUrl: "./view-page.component.html",
  styleUrls: ["./view-page.component.scss"],
})
export class ViewPageComponent {
  constructor(private service: PagesService, private route: ActivatedRoute) {}
  private subkey: any;
  keyword: any;
  viewData: any;

  ngOnInit() {
    this.subkey = this.route.params.subscribe((params) => {
      this.keyword = params["keyword"]; // (+) converts string 'id' to a number
    });

    this.service.viewDetails(this.keyword).subscribe((data) => {
      this.viewData = data;
      console.log(this.viewData);
    });
  }
}
