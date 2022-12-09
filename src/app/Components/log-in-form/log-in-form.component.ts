import { Component, inject, OnInit } from '@angular/core';
import { Isignin } from 'src/app/Models/isignin';
import { Loggeduser } from 'src/app/Models/loggeduser';
import { SigninService } from 'src/app/Services/signin.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})


export class LogInFormComponent implements OnInit {
 

Email:string =""
Password:string =""
  constructor(private signIn:SigninService,private cookieService:CookieService) { }

  ngOnInit(): void {
  }
SignIn(){
  let User:Isignin ={email:this.Email ,password:this.Password } ;

  this.signIn.SignIn(User).subscribe((usr:Loggeduser)=>{
    
  
    this.cookieService.set(usr.id, usr.userName,10);
}
  )}
}