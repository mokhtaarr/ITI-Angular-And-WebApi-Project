import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { ProductOfferApiService } from 'src/app/Services/product-offer-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-product-by-cat-id',
  templateUrl: './product-by-cat-id.component.html',
  styleUrls: ['./product-by-cat-id.component.css']
})
export class ProductByCatIdComponent implements OnInit {
  currentCatId:number=0;
  prd?:IProductOffer[];
  prdOfferlist?:IProductOffer[];
  constructor(private productOfferApiservice : ProductOfferApiService,
    private activedRoute:ActivatedRoute,private shoppingCartservice:ShoppingCartService) { }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(paramMap =>{
      this.currentCatId=(paramMap.get('catid'))?Number(paramMap.get('catid')):0;
      
     this.productOfferApiservice.getProductsByCatId(this.currentCatId).subscribe(prdid=>{this.prdOfferlist=prdid})

 })
  }

  AddToCart(prd:IProductOffer)
  {
    this.shoppingCartservice.addToCart(prd);
    alert("Add Success")

  }

}
