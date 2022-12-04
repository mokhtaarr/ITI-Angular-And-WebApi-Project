import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './Components/create-account/create-account.component';
import { LogInFormComponent } from './Components/log-in-form/log-in-form.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { MainComponent } from './Components/main/main.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductByCatIdComponent } from './Components/product-by-cat-id/product-by-cat-id.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';

const routes: Routes = [
  {path:'',component:MainComponent,children:[
    {path:'',redirectTo:'Home',pathMatch:'full'},// Default path 
    {path:'Home',component:MainLayoutComponent}
   


  ]},
  {path:'LogIn',component:LogInFormComponent},
  {path:'CreateAcount',component:CreateAccountComponent},
  {path:'productdetails',component:ProductDetailsComponent},
  {path:'productdetails/:pid',component:ProductDetailsComponent},
  {path:'productByCatId/:catid',component:ProductByCatIdComponent},
  {path:'**',component:NotFoundComponent}
  // {path:'register',component:UserRegisterComponent},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
