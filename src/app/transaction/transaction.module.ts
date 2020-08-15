import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { MaterialModule } from '../core/material.module';
import { TransactionRoutingModule } from './transaction.routing'
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionService} from './transaction.service'



@NgModule({
  declarations: [TransactionComponent, ListComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TransactionRoutingModule,
    ReactiveFormsModule
  ],
  providers: [TransactionService]
})
export class TransactionModule { }
