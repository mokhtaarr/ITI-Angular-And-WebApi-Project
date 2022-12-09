import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICategory } from 'src/app/Models/ICategory';
import { CategoryApiService } from 'src/app/Services/category-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
catlist?:ICategory[];
SelectedCatId:number = 0 ;
  constructor( private categoryApiService : CategoryApiService , public translate:TranslateService,
    private route:Router) { }

  ngOnInit(): void {
    this.categoryApiService.getAllGategory().subscribe(list=>this.catlist=list)
  }

  OpenPrdDetails(prdID:number){
    this.route.navigate(['productdetails',prdID])
  }

  OpenPrdByCatId(catid:number){
    this.route.navigate(['productByCatId',catid]
    )
  }
}
