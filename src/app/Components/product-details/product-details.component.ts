import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { ProductOfferApiService } from 'src/app/Services/product-offer-api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
prd?:IProductOffer;
currentPrdID :number = 0


  constructor(private productOfferApiservice : ProductOfferApiService,
              private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    // let currentPrdID:number=(this.activedRoute.snapshot.paramMap.get('pid'))?
    // Number(this.activedRoute.snapshot.paramMap.get('pid')):0;

    // let foundProduct = this.productOfferApiservice.getProductByID(currentPrdID);

    this.activedRoute.paramMap.subscribe(paramMap =>{
      this.currentPrdID=(paramMap.get('pid'))?Number(paramMap.get('pid')):0;
      
     this.productOfferApiservice.getProductByID(this.currentPrdID).subscribe(prdid=>{this.prd=prdid})

 })
    
  }

 
}
