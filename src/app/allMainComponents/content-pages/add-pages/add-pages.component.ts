import { Component, OnInit, Input } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from "@angular/forms";

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { addPagesModle } from "../pages.modle";
import { subPages } from "../sub-pages.modle";

@Component({
  selector: "app-add-pages",
  templateUrl: "./add-pages.component.html",
  styleUrls: ["./add-pages.component.scss"],
})
export class AddPagesComponent implements OnInit {
  public Editor = ClassicEditor;
  @Input() progress;
  onChange: Function;

  pptUploadPath: string[] = [];
  videoImagePath: string[] = [];
  snapShotPath: string[] = [];

  constructor(private fb: FormBuilder) {}

  hide = true;
  isTableVisible = false;

  addPagesForm = this.fb.group({
    title: ["", [Validators.required]],
    keyword: ["", [Validators.required]],
    pptUpload: [null, [Validators.required]],
    videoImageUpload: [null, [Validators.required]],
    videoURL: ["", [Validators.required]],
    descriptions: ["", [Validators.required]],
    snapshot: [null, [Validators.required]],
    heading: [""],
    description: [""],
  });

  agree = false;
  customForm: UntypedFormGroup;
  subPageList: subPages[] = [];

  subPagesData: subPages = new subPages("", "");
  addPagesData: addPagesModle = new addPagesModle(
    "",
    "",
    null,
    null,
    "",
    "",
    null,
    this.subPageList
  );

  //
  onAddPagesForm() {
    this.addPagesData.title = this.addPagesForm.value.title;
    this.addPagesData.keyword = this.addPagesForm.value.keyword;
    this.addPagesData.pptUpload = this.addPagesForm.value.pptUpload;
    this.addPagesData.videoImageUpload =
      this.addPagesForm.value.videoImageUpload;
    this.addPagesData.videoURL = this.addPagesForm.value.videoURL;
    this.addPagesData.descriptions = this.addPagesForm.value.descriptions;
    this.addPagesData.snapshot = this.addPagesForm.value.snapshot;
    this.addPagesData.subPages = this.subPageList;

    console.log("Form Value", this.addPagesData);
    // this.addPagesForm.reset();
  }

  ngOnInit(): void {}

  addCapacity() {
    if (
      this.addPagesForm.value.heading != "" &&
      this.addPagesForm.value.description != ""
    ) {
      this.subPagesData.heading = this.addPagesForm.value.heading;
      this.subPagesData.description = this.addPagesForm.value.description;

      this.subPageList.push(this.subPagesData);
      console.log(this.subPageList);

      this.subPagesData = new subPages("", "");
      this.addPagesForm.controls["heading"].reset();
      this.addPagesForm.controls["description"].reset();

      this.isTableVisible = true;
    }
  }

  deleteCapacity(plantCapacity: subPages) {
    var index = this.subPageList.indexOf(plantCapacity);
    this.subPageList.splice(index, 1);

    if (this.subPageList.length == 0) {
      this.isTableVisible = false;
    } else {
      this.isTableVisible = true;
    }
  }

  // for files path
  getpptUploadPath(e) {
    this.pptUploadPath = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.pptUploadPath.push(e.target.files[i]);
    }
  }

  getvideoImagePath(e) {
    this.videoImagePath = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.videoImagePath.push(e.target.files[i]);
    }
  }

  getsnapShotPath(e) {
    this.snapShotPath = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.snapShotPath.push(e.target.files[i]);
    }
  }
}
