import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAccount } from 'src/app/Models/create-account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  userFormGroup: FormGroup;
  newPrd:CreateAccount = {} as CreateAccount;
  constructor(private formbuilder:FormBuilder) {
    this.userFormGroup=this.formbuilder.group({
      fullName:['', [Validators.required,Validators.minLength(5)]],
      email:['', [Validators.required ,Validators.email]],
      //reular expressin
      mobileNo:formbuilder.array([formbuilder.control('', [Validators.required , Validators.pattern(/^[0-9]\d*$/)
    ])]),
      address:this.formbuilder.group({
        city:['' , [Validators.required]],
        street:['', [Validators.required]],
        PostalCode:['', [Validators.required]]
      }),
      password:['', [Validators.required,Validators.minLength(6)]],
      repassword:['']
    })
   }
  
   get mobileNo(){
    return this.userFormGroup.get('mobileNo') as FormArray;
  }


 get fullName(){
    return this.userFormGroup.get('fullName');
  }

  get email(){
    return this.userFormGroup.get('email');
  }

  get address(){
    return this.userFormGroup.get('address');
  }

  get password(){
    return this.userFormGroup.get('password');
  }
  addMobileNo(){
    this.mobileNo.push(this.formbuilder.control(''));

  }

  RemoveMobileNo(){
    this.mobileNo.removeAt(this.mobileNo.length-1);

  }
 




  ngOnInit(): void {
  }

}
