import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IOrder } from 'src/app/Models/iorder';
import { IPayment } from 'src/app/Models/ipayment';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { Loggeduser } from 'src/app/Models/loggeduser';
import { OrderAPIService } from 'src/app/Services/order-api.service';
import { PaymentAPIService } from 'src/app/Services/payment-api.service';
import { ShoppingCartAPIService } from 'src/app/Services/shopping-cart-api.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
user!: Loggeduser;
item:IProductOffer[]=[];
TotalPrice:number=0;
cash:boolean=false;
visa:boolean=false;
  constructor(private shoppingCartservice:ShoppingCartService,
    private route: Router,
    private cookieService:CookieService,
    private shoppingCartSer: ShoppingCartAPIService,
    private paymentSer: PaymentAPIService,private orderSer:OrderAPIService) { }


 

  ngOnInit(): void {

    this.item = this.shoppingCartservice.getItems();
    
  }

  addToCart(it:IProductOffer)
  {
    if (!this.shoppingCartservice.itemInCart(it)) {
      it.qtyTotal = 1;
      this.shoppingCartservice.addToCart(it); //add items in cart
      this.item = this.shoppingCartservice.getItems();
      console.log("dt , it");
    }
  }

  TotalPriceOfProduct()
  {
    for(var x of this.item)
    {
      this.TotalPrice += (x.Price * x.Quantity)

    }
  }

  OrderSubmit(){
    
    var id=this.cookieService.get("Id");
    if(id==null || id == undefined){
      this.route.navigate(['LogIn']);
    }
else{
  var price  = this.TotalPrice ;
    if(this.cash == true){
 var shoppingcartID:number = 0;

   //get items id to add in shopping cart
    var itemsId:number[]=[] ;
    for (const iterator of this.item) {
      itemsId.push(iterator.id)
      }

    // add Item in shopping cart
     this. shoppingCartSer.Add(itemsId).subscribe((Id:number)=>{ shoppingcartID=Id; });
//add payment 
  var payment:IPayment={id:0,paymentType:"Cash",isAllowed:true}
  var paymentId!:number ;
  this.paymentSer.Add(payment).subscribe((ConfirmedPayment:IPayment)=>{ payment.id=ConfirmedPayment.id });

//submit the order
    var order:IOrder={id:0,
      customerId:this.cookieService.get("Id"),
      paymentId:payment.id,orderDate:new Date(),
      isDeleted:false,shoppingCartId:shoppingcartID};

      this.orderSer.Add(order)
      this.route.navigate(['order', this.item]); 
    }
    if( this.visa==true){

      this.route.navigate(['pay',price]);
      }
    }
  }

}