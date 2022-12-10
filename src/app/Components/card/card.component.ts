import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { IProductOffer } from 'src/app/Models/iproduct-offer';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
public payPalConfig ?: IPayPalConfig;
item:IProductOffer[]=[];
TotalPrice:number=0;

  constructor(private shoppingCartservice:ShoppingCartService) { }


 

  ngOnInit(): void {

    this.item = this.shoppingCartservice.getItems();
    this.initConfig();
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
      this.TotalPrice += x.Price

    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EGP',
      clientId: 'AToDsg4D_1Rdhkp5gEA71rJcqvKLRahIV5DEC2wSVFdAkz6XdYODv2GsHzqx0UbqPCi-A3xLKSVabQX6', // add paypal clientId here
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EGP',
            value: '0.01',
            breakdown: {
              item_total: {
                currency_code: 'EGP',
                value: '0.01'
              }
            }
          },
          items: [{
            name: 'The Swag Coder',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EGP',
              value: '0.01',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',

        color: 'blue',
        shape: 'rect'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }
}