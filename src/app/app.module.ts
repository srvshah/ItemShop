import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { ReactiveFormsModule  } from '@angular/forms'
import {AuthService} from './service/auth.service'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import {CoreModule} from './core/core.module'
import { AuthGuardService } from './service/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    DashboardComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule
  ],
  
  providers: [
    AuthService,
    AuthGuardService
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule{

}
