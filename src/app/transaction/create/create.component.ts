import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer/customer.service';
import { ProductService } from 'src/app/product/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  transCreateForm: FormGroup
  customers = []
  products = []
  loading = false
  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CreateComponent>,
  ) { 
    this.transCreateForm = this.fb.group({
      'customerId': ['', [Validators.required]],
      'productId': ['', [Validators.required]],
      'quantity': ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.fetchCustomers()
    this.fetchProducts()
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
  onNoClick(): void {
    this.dialogRef.close();
  }
  create(){
    this.loading = true
    this.transactionService.create(this.transCreateForm.value).subscribe(res => {
      this.toastr.success('Transaction created')
      this.loading = false
    }, err => {
      this.loading = false
    })
    
  }

}
