import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../transaction.service';
import { TransactionModel } from '../models/transaction';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer/customer.service';
import { ProductService } from 'src/app/product/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updateTransactionForm: FormGroup
  transaction : TransactionModel
  customers = []
  products = []
  transactionSelect = [
    {value: '0', viewValue: 'Processing'},
    {value: '1', viewValue: 'Complete'}
  ]
  loading = false
  transactionId: number
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private productService: ProductService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<UpdateComponent>,
  ) { 
    this.updateTransactionForm = this.fb.group({
      'customerId': ['', [Validators.required]],
      'productId': ['', [Validators.required]],
      'quantity': ['', [Validators.required]],
      'transactionStatus': ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.transactionId = this.data['id']
    this.fetchCustomers()
    this.fetchProducts()
    this.fetchTransaction()
  }
  fetchCustomers(){
    
    this.customerService.listCustomer().subscribe(res => {
      res.forEach(item => {
        this.customers.push({
          'value': item.id,
          'viewValue': item.name
        })
      });
      
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchProducts(){
    this.productService.listProduct().subscribe(res => {
      res.forEach(item => {
        this.products.push({
          'value': item.id,
          'viewValue': item.name
        })
      });
    })
  }
  fetchTransaction(){
    this.transactionService.getTransaction(this.transactionId).subscribe(res => {
      res['transactionStatus'] == 'Processing' ? res ['transactionStatus'] = '0' : res ['transactionStatus'] = '1'
      this.transaction = res
      this.updateTransactionForm = this.fb.group({
        'customerId': [this.transaction.customerId, [Validators.required]],
        'productId': [this.transaction.productId, [Validators.required]],
        'quantity': [this.transaction.quantity, [Validators.required]],
        'transactionStatus': [this.transaction.transactionStatus, [Validators.required]]
      })
    })
  }
  update(){
    this.loading = true
    this.transactionService.updateTransaction(this.transactionId, this.updateTransactionForm.value).subscribe(res => {
      this.toastr.success('Transaction Updated')
      this.loading = false
    }, err => {
      this.loading = false
    })
  }

}
