import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';
import { InvoiceRoutingModule } from './invoice.routing';
import { DetailComponent } from './detail/detail.component'



@NgModule({
  declarations: [ListComponent, CreateComponent, DetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
