import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IOrder } from 'src/app/Models/iorder';
import { IPayment } from 'src/app/Models/ipayment';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { OrderAPIService } from 'src/app/Services/order-api.service';
import { PaymentAPIService } from 'src/app/Services/payment-api.service';
import { ShoppingCartAPIService } from 'src/app/Services/shopping-cart-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  items!: IProductOffer[] ;
  constructor(private shoppingCartservice: ShoppingCartService,
    private route: Router,
    private cookieService: CookieService,
    private shoppingCartSer: ShoppingCartAPIService,
    private paymentSer: PaymentAPIService,
    private orderSer: OrderAPIService) { }

  ngOnInit(): void {
    var OrderItems = localStorage.getItem('orderItems');

    if(OrderItems!=null && OrderItems!=undefined ){
      this.items? JSON.parse(OrderItems):[];
    }
  }
  
deleteOrder(id:number){
  for (const order of this.items) {
    
if(order.id === id){
  this.items.filter(order=>order.id !== id)
}
  }

}
UpdateOrder(){
  //get order Id
  var id = this.cookieService.get('orderId');
  //get order
  var order!:IOrder ;
  this.orderSer.getById(+id).subscribe((ord) => { order=ord})
      //get items id to add in shopping cart
      var itemsId: number[] = [];
      for (const iterator of this.items) {
        itemsId.push(iterator.id);
      }
        var shoppingcartID=0;
      // add Item in shopping cart
      this.shoppingCartSer.Add(itemsId).subscribe((Id: number) => {
        shoppingcartID = Id;
      });
      //add payment
     
      //submit Updating the order
      order.shoppingCartId=shoppingcartID;
      this.orderSer.update(order).subscribe(() => {})
    }
  
}


