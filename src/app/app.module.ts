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
import { DashboardComponent } from './dashboard/dashboard.component';
import {CoreModule} from './core/core.module'
import { AuthGuardService } from './service/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { InvoiceComponent } from './invoice/invoice.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InvoiceComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule{

}
