import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CustomerService } from './customer.service'
import { CustomerRoutingModule } from './customer.routing'
import { MaterialModule } from '../core/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateComponent, ListComponent, UpdateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CustomerRoutingModule
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
