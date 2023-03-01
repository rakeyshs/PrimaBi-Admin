import { Component, OnInit, Input } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import Swal from "sweetalert2";

import { addPagesModle } from "../pages.modle";
import { subPages } from "../sub-pages.modle";
import { PagesService } from "../pages.service";

@Component({
  selector: "app-edit-sub-page",
  templateUrl: "./edit-sub-page.component.html",
  styleUrls: ["./edit-sub-page.component.scss"],
})
export class EditSubPageComponent {
  public Editor = ClassicEditor;
  private subid: any;

  @Input() progress;
  onChange: Function;
  id: number;
  subPagesData: any;

  constructor(
    private fb: FormBuilder,
    private pagesServe: PagesService,
    private service: PagesService,
    private route: ActivatedRoute
  ) {}

  addPagesForm = this.fb.group({
    title: ["", [Validators.required]],
    keyword: ["", [Validators.required]],
    pptUpload: ["", [Validators.required]],
    videoImageUpload: ["", [Validators.required]],
    videoURL: ["", [Validators.required]],
    descriptions: ["", [Validators.required]],
    snapshot: ["", [Validators.required]],
    heading: [""],
    description: [""],
  });

  ngOnInit() {
    this.subid = this.route.params.subscribe((params) => {
      this.id = params["id"];
    });
    this.service.getSubPages(this.id).subscribe((data) => {
      this.subPagesData = data;
      console.log(this.subPagesData);
    });
  }
}
