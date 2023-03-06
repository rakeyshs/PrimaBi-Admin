import { Component } from "@angular/core";
import { PagesService } from "../pages.service";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-view-page",
  templateUrl: "./view-page.component.html",
  styleUrls: ["./view-page.component.scss"],
})
export class ViewPageComponent {
  constructor(
    private service: PagesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  private subkey: any;
  keyword: any;
  viewData: any;
  title: any;
  pptUrl: any;
  videoImage: any;
  videoURL: any;
  description: any;
  snapshot: any;
  subpages: any;

  ngOnInit() {
    this.subkey = this.route.params.subscribe((params) => {
      this.keyword = params["keyword"]; // (+) converts string 'id' to a number
    });

    this.service.viewDetails(this.keyword).subscribe((data) => {
      this.viewData = data;
      this.keyword = this.viewData.keyword;
      this.title = this.viewData.title;
      this.pptUrl = this.viewData.ppTpath;
      this.videoImage = this.viewData.videoImage;
      this.videoURL = this.viewData.videoURL;
      this.description = this.viewData.description;
      this.snapshot = this.viewData.snapshot;
      this.subpages = this.viewData.subPages;

      console.log(this.subpages[0].description);
    });
  }
}
