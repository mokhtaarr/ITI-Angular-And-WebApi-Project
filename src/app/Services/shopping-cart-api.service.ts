import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartAPIService {
  private httpOptions = {};
  
  
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }}

    Add(Id:number[]):Observable<number>{
      return this.httpClient.post<number>(`${environment.APIBaseURL}/ShoppingCarts/Add`,JSON.stringify(Id), this.httpOptions)
    }
}
