import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerModel } from '../models/customer';
import { map, mergeMap } from 'rxjs/operators'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  custUpdateForm: FormGroup
  customer: CustomerModel = new CustomerModel
  loading = false
  genderValue: string
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
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

      if(this.customer.gender == "Unknown"){
        this.genderValue = "0"
      }
      else if( this.customer.gender == "Male"){
        this.genderValue = "1"
      }
      else if(this.customer.gender == "Female"){
        this.genderValue = "2"
      }
      this.custUpdateForm = this.fb.group({
        'name': [this.customer.name, [Validators.required]],
        'address': [this.customer.address, [Validators.required]],
        'phone': [this.customer.phone],
        'gender': [this.genderValue, [Validators.required]]
      })
    })
  }

  update(id){
    this.loading = true
    this.customerService.updateCustomer(id, this.custUpdateForm.value).subscribe(res=>{
      this.router.navigate(['/customer'])
      this.loading = false
    }, err => {
      this.loading = false
    })
  }

}
