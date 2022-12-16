import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { ProductOfferApiService } from 'src/app/Services/product-offer-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.css']
})
export class CardBodyComponent implements OnInit {
 prdOfferlist:IProductOffer[]=[];
 inputPrice:number=0 ;

 

  constructor(private productOfferApiService:ProductOfferApiService , private route:Router
    , private shoppingCartservice:ShoppingCartService) { 
    
  }

  ngOnInit(): void {
    this.productOfferApiService.getAllProductOffer().subscribe(prd=>this.prdOfferlist=prd);

  }
  OpenPrdDetails(prdID:number){
    this.route.navigate(['productdetails',prdID])
  }
  
  AddToCart(prd:IProductOffer)
  {
    this.shoppingCartservice.addToCart(prd);
    alert("Add Success")

  }

  filterProduct()
  {

    this.prdOfferlist = this.prdOfferlist.filter(b=>b.Price < this.inputPrice)
  }

  filterByName(item:string)
  {
    this.prdOfferlist = this.prdOfferlist.filter(b=>b.name.startsWith(item))
  }

  


}
