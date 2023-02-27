import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addPagesModle } from '../../../pages.modle';
import { PagesService } from '../../../pages.service';
import { subPages } from '../../../sub-pages.modle';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent {
  model: addPagesModle

  subPageList: subPages[] = [];
  constructor(private userService: PagesService, private router: ActivatedRoute) { 
    this.model = new addPagesModle(0,'', '' ,'', '', '', '', '',this.subPageList);
  }

  ngOnInit(): void {

    this.userService.userview(this.router.snapshot.params["keyword"]).subscribe({
      next:(data) =>{
        console.log(data);
        this.model = data
      },
      error:(err) =>{
        console.log(err.error);
        
      }
    })
  

    
  }

}