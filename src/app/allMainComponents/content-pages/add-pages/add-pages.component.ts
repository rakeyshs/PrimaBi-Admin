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
import Swal from "sweetalert2";

import { addPagesModle } from "../pages.modle";
import { subPages } from "../sub-pages.modle";
import { PagesService } from "../pages.service";

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
  pptPath: any;
  videoImagePath: string[] = [];
  vdoImgPath: any;
  snapShotPath: string[] = [];
  snapShotPaths: any;

  constructor(private fb: FormBuilder, private pagesServe: PagesService) {}

  hide = true;
  isTableVisible = false;

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

  agree = false;
  customForm: UntypedFormGroup;
  subPageList: subPages[] = [];

  pptData: any;

  subPagesData: subPages = new subPages("", "");
  addPagesData: addPagesModle = new addPagesModle(
    0,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    this.subPageList
  );

  //
  onAddPagesForm() {
    this.addPagesData.title = this.addPagesForm.value.title;
    this.addPagesData.keyword = this.addPagesForm.value.keyword;
    this.addPagesData.ppTpath = this.pptPath.response;
    this.addPagesData.videoImage = this.vdoImgPath.response;
    this.addPagesData.videoURL = this.addPagesForm.value.videoURL;
    this.addPagesData.description = this.addPagesForm.value.descriptions;
    this.addPagesData.snapshot = this.snapShotPaths.response;
    this.addPagesData.subPages = this.subPageList;

    console.log("Form Value", this.addPagesData);
    // this.addPagesForm.reset();

    Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.pagesServe.addContentPage(this.addPagesData);
      }
    });
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

    this.pagesServe
      .FileAttachmentsUpload(this.pptUploadPath)
      .subscribe((data) => {
        console.log(data);
        this.pptPath = data;
      });
  }

  getvideoImagePath(e) {
    this.videoImagePath = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.videoImagePath.push(e.target.files[i]);
    }
    this.pagesServe
      .FileAttachmentsUpload(this.pptUploadPath)
      .subscribe((data) => {
        console.log(data);
        this.vdoImgPath = data;
      });
  }

  getsnapShotPath(e) {
    this.snapShotPath = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.snapShotPath.push(e.target.files[i]);
    }
    this.pagesServe
      .FileAttachmentsUpload(this.pptUploadPath)
      .subscribe((data) => {
        console.log(data);
        this.snapShotPaths = data;
      });
  }
}