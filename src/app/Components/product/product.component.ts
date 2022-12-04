import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductApiService } from 'src/app/Services/product-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
prdlist:IProduct[]=[];
  constructor(private productApiService:ProductApiService) { }

  ngOnInit(): void {
    this.productApiService.getAllProduct().subscribe((result)=>{
      this.prdlist = result;
      console.log(result,'result');
      console.log(this.prdlist,'api');
  });
  }
}
