import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addPagesModle } from '../../../pages.modle';
import { PagesService } from '../../../pages.service';
import { subPages } from '../../../sub-pages.modle';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent {
  model: addPagesModle
  public Editor =ClassicEditor;
  action: string;
  actionData: string;
  dialogTitle: string;
  parentOption: string;
  advanceTable:subPages;
  advanceTableForm: UntypedFormGroup;

  subPageList: subPages[] = [];
  constructor(private userService: PagesService, private router: ActivatedRoute,private fb: UntypedFormBuilder,) { 
    this.model = new addPagesModle(0,'', '' ,'', '', '', '', '',this.subPageList);
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      heading:[this.advanceTable.heading],
      description: [this.advanceTable.description],

    });
  }

  ngOnInit(): void {

    // get adminview data

    this.userService.update(this.router.snapshot.params["id"]).subscribe({
      next:(data) =>{
        console.log(data);
        this.model = data;
      },
      error:(err) =>{
        console.log(err.error);
        
      }
    })
  

    
  }
  add(){
    
  }

}

