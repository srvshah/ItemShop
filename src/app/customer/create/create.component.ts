import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerModel } from '../models/customer';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  custCreateForm: FormGroup
  customer: CustomerModel = new CustomerModel
  loading = false
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) { 
    this.custCreateForm = this.fb.group({
      'name': [this.customer.name, [Validators.required]],
      'address': [this.customer.address, [Validators.required]],
      'phone': [this.customer.phone, [Validators.required]],
      'gender': [this.customer.gender, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }
  create(){
    this.loading = true
    this.customerService.createCustomer(this.custCreateForm.value).subscribe(res => {
      this.loading = false
      this.router.navigate(['/customer'])
    }, err => {
      this.loading =false
    })
  }

}
