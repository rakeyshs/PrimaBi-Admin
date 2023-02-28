import { Component, OnInit, Input } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from "@angular/forms";

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
    descriptions: [""],
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
    this.addPagesData.ppTpath = this.selectFilesPath1.response;
    this.addPagesData.videoImage = this.selectFilesPath2.response;
    this.addPagesData.videoURL = this.addPagesForm.value.videoURL;
    this.addPagesData.description = this.addPagesForm.value.descriptions;
    this.addPagesData.snapshot = this.selectFilesPath3.response;
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

  //heading and description function

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

  //file uploading
  selectFiles1:FileList|any;
  selectFiles2:FileList|any;
  selectFiles3:FileList|any;
  selectFilesPath1:any;
  selectFilesPath2:any;
  selectFilesPath3:any;

  //pptPath upload
  getFileDetails1(e:any) {
   
    this.selectFiles1 = e.target.files;

    this.pagesServe.fileUpload(this.selectFiles1).subscribe((ppTpath)=>{
      console.log(ppTpath);

      this.selectFilesPath1=ppTpath;
      
    })

}
//videoupload

getFileDetails2(e:any) {
   
  this.selectFiles2 = e.target.files;
  this.pagesServe.fileUpload(this.selectFiles2).subscribe((videoImage)=>{
    console.log(videoImage);

    this.selectFilesPath2=videoImage;
    
  })


  //snapshot upload

}
getFileDetails3(e:any) {
   
  this.selectFiles3 = e.target.files;
  this.pagesServe.fileUpload(this.selectFiles3).subscribe((snapshot)=>{
    console.log(snapshot);
    this.selectFilesPath3=snapshot;
    
  })


}
}
