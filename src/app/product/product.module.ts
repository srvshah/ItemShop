import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ProductRoutingModule } from './product.routing';
import {ProductService} from './product.service'



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  providers:[ProductService]
})
export class ProductModule { }
