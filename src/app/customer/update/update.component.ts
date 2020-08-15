import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerModel } from '../models/customer';
import { map, mergeMap } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  custUpdateForm: FormGroup
  customer: CustomerModel = new CustomerModel
  loading = false
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) { 
    this.custUpdateForm = this.fb.group({
      'name': '',
      'address': '',
      'phone': '',
      'gender': ''
    })
  }

  ngOnInit(): void {
    this.fetchData()
  }
  fetchData(){
    this.route.params.pipe(
      map(res =>{
        const id= res['id']
        return id
      }), 
      mergeMap(id => this.customerService.getCustomer(id))
    ).subscribe(res => {
      this.customer = res
      this.custUpdateForm = this.fb.group({
        'name': [this.customer.name, [Validators.required]],
        'address': [this.customer.address, [Validators.required]],
        'phone': [this.customer.phone],
        'gender': [this.customer.gender, [Validators.required]]
      })
    })
  }

  update(id){
    this.loading = true
    this.customerService.updateCustomer(id, this.custUpdateForm.value).subscribe(res=>{
      this.router.navigate(['/customer'])
      this.loading = false
      this.toastrService.success('Customer Updated')
    }, err => {
      this.loading = false
    })
  }

}
