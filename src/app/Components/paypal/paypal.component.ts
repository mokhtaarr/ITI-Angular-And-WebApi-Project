import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Loggeduser } from 'src/app/Models/loggeduser';
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  public payPalConfig ?: IPayPalConfig;
price:number =0;
Userid :string;
  constructor(private activedRoute: ActivatedRoute,private cookieService:CookieService) {
 this.Userid=this.cookieService.get("Id")
}

  ngOnInit(): void {
    this.initConfig();
    this.activedRoute.paramMap.subscribe((paramMap) => {
      this.price = paramMap.get('price') ? Number(paramMap.get('pid')) : 0;})
  }



  
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      // clientId: `${this.Userid}`, // add paypal clientId here
      clientId: 'AToDsg4D_1Rdhkp5gEA71rJcqvKLRahIV5DEC2wSVFdAkz6XdYODv2GsHzqx0UbqPCi-A3xLKSVabQ', // add paypal clientId here
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: `${this.price}`,
            // value: '0.01',
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: `${this.price}`
                // value: '0.01'
              }
            }
          },
         
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
