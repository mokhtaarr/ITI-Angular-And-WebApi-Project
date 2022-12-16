import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IOrder } from '../Models/iorder';
@Injectable({
  providedIn: 'root'
})
export class OrderAPIService {
  private httpOptions = {};
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }}

    Add(Order:IOrder):Observable<number>{
      return this.httpClient.post<number>(`${environment.APIBaseURL}/Order`,JSON.stringify(Order), this.httpOptions)
    }
}
