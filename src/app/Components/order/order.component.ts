import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { OrderAPIService } from 'src/app/Services/order-api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  Address: string;
  items!: IProductOffer[] ;
  IsOrder: boolean;
  constructor(
    private cookieService: CookieService,
    private orderSer: OrderAPIService
  ) {
    this.Address = this.cookieService.get('UserAddress');
    this.IsOrder=false;
  }

  ngOnInit(): void {
   var OrderItems = localStorage.getItem('orderItems');
   if(OrderItems!=null && OrderItems!=undefined ){
    this.items? JSON.parse(OrderItems):[];
    this.IsOrder= true;
   }
  }

  deleteOrder() {
    var orderId = this.cookieService.get('orderId');
    this.orderSer.delete(+orderId).subscribe(() => {});
    
  }
}
