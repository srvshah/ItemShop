import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer/customer.service';
import { InvoiceService } from '../invoice.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  loading = false
  invoiceCreateForm: FormGroup
  customers = []
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CreateComponent>,
  ) { 
    this.invoiceCreateForm = this.fb.group({
      'customerId': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.fetchCustomers()
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
  generate(){
    this.loading = true
    this.invoiceService.generate(this.invoiceCreateForm.value).subscribe(res => {
      this.loading = false
      this.toastr.success('invoice generated')
    }, err => {
      this.loading = false
    })
  }
}
