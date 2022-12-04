import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Models/iproduct';
import { IProductOffer } from '../Models/iproduct-offer';

@Injectable({
  providedIn: 'root'
})
export class ProductOfferApiService {
  prdOfferlist:IProductOffer[]

  constructor(private httpclient:HttpClient) {
    this.prdOfferlist=[]
   }

  getAllProductOffer():Observable<IProductOffer[]>{
    return this.httpclient.get<IProductOffer[]>(`http://localhost:3000/ProductsWithOffer`)
  }

  getProductByID(prdID:number):Observable<IProductOffer>{
    return this.httpclient.get<IProductOffer>(`http://localhost:3000/ProductsWithOffer/${prdID}`)

  }
  getProductsByCatId(CatId:number):Observable<IProductOffer[]>{

    return this.httpclient.get<IProductOffer[]>(`http://localhost:3000/ProductsWithOffer?CatId=${CatId}`);
  }
}
