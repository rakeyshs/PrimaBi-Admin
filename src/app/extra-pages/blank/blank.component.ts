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

import { accoDataList } from "../extra-arrayPage.modle";
import { addPagesModle } from "../extra-pages.modle";

@Component({
  selector: "app-blank",
  templateUrl: "./blank.component.html",
  styleUrls: ["./blank.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BlankComponent,
      multi: true,
    },
  ],
})
export class BlankComponent implements OnInit {
  public Editor = ClassicEditor;

  @Input() progress;
  onChange: Function;
  myFiles1: string[] = [];
  myFiles2: string[] = [];

  accoArrayLists: accoDataList[] = [];

  addPagesForm = this.fb.group({
    title: ["", [Validators.required]],
    keyword: ["", [Validators.required]],
    pptUpload: [null, [Validators.required]],
    videoImageUpload: [null, [Validators.required]],
    videoURL: ["", [Validators.required]],
    description: ["", [Validators.required]],
    accordionHeading: [""],
    accordionDescription: [""],
  });

  hide = true;
  isTableVisible = false;

  agree = false;
  customForm: UntypedFormGroup;

  constructor(private fb: FormBuilder) {}

  accoData: accoDataList = new accoDataList("", "");
  addpagesData: addPagesModle = new addPagesModle(
    "",
    "",
    null,
    null,
    "",
    "",
    this.accoArrayLists
  );

  onAddPagesForm() {
    this.addpagesData.title = this.addPagesForm.value.title;
    this.addpagesData.keyword = this.addPagesForm.value.keyword;
    this.addpagesData.pptUpload = this.addPagesForm.value.pptUpload;
    this.addpagesData.videoImageUpload =
      this.addPagesForm.value.videoImageUpload;
    this.addpagesData.videoURL = this.addPagesForm.value.videoURL;
    this.addpagesData.description = this.addPagesForm.value.description;
    this.addpagesData.accoArrayList = this.accoArrayLists;

    console.log("Form Value", this.addpagesData);
    // this.addPagesForm.reset();
  }

  getFile1Details(e) {
    this.myFiles1 = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles1.push(e.target.files[i]);
    }
  }

  getFile2Details(e) {
    this.myFiles2 = [];
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles2.push(e.target.files[i]);
    }
  }
  ngOnInit(): void {}

  deleteCapacity(plantCapacity: accoDataList) {
    var index = this.accoArrayLists.indexOf(plantCapacity);
    this.accoArrayLists.splice(index, 1);

    if (this.accoArrayLists.length == 0) {
      this.isTableVisible = false;
    } else {
      this.isTableVisible = true;
    }
  }

  addCapacity() {
    if (
      this.addPagesForm.value.accordionHeading != "" &&
      this.addPagesForm.value.accordionDescription != ""
    ) {
      this.accoData.accordionHeading = this.addPagesForm.value.accordionHeading;
      this.accoData.accordionDescription =
        this.addPagesForm.value.accordionDescription;

      this.accoArrayLists.push(this.accoData);
      console.log(this.accoArrayLists);

      this.accoData = new accoDataList("", "");
      this.addPagesForm.controls["accordionHeading"].reset();
      this.addPagesForm.controls["accordionDescription"].reset();

      this.isTableVisible = true;
    }
  }
}
