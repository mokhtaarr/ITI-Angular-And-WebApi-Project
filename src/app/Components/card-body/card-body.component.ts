import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { ProductOfferApiService } from 'src/app/Services/product-offer-api.service';

@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.css']
})
export class CardBodyComponent implements OnInit {
 prdOfferlist?:IProductOffer[];
  constructor(private productOfferApiService:ProductOfferApiService , private route:Router) { 
    
  }

  ngOnInit(): void {
    this.productOfferApiService.getAllProductOffer().subscribe(prd=>this.prdOfferlist=prd);

  }
  OpenPrdDetails(prdID:number){
    this.route.navigate(['productdetails',prdID])
  }


}