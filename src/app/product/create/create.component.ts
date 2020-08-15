import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ProductModel} from './../models/product'
import { ProductModule } from '../product.module';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  product: ProductModel = new ProductModel
  prodCreateForm: FormGroup
  loading = false
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastrService: ToastrService
  ) { 
    this.prodCreateForm = this.fb.group({
      'name': [this.product.name, [Validators.required]],
      'price': [this.product.price, [Validators.required]],
      'imageUrl': [this.product.imageUrl],
      'description': [this.product.description, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  create(){
    this.loading = true
    this.productService.createProduct(this.prodCreateForm.value).subscribe(res=> {
      this.router.navigate(['/product'])
      this.loading = false
      this.toastrService.success('Product Created')
    }, err => {
      this.loading = false
    })
  }

}
