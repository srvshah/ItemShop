import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductModel } from '../models/product';
import { map, mergeMap } from 'rxjs/operators'
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  prodUpdateForm: FormGroup
  product: ProductModel = new ProductModel
  loading =false
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.prodUpdateForm = this.fb.group({
      'name': '',
      'price': '',
      'imageUrl': '',
      'description': ''
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
      mergeMap(id => this.productService.getProduct(id))
    ).subscribe(res => {
      this.product = res
      this.prodUpdateForm = this.fb.group({
        'name': [this.product.name, [Validators.required]],
        'price': [this.product.price, [Validators.required]],
        'imageUrl': [this.product.imageUrl],
        'description': [this.product.description, [Validators.required]]
      })
    })
  }

  update(id){
    this.loading = true
    this.productService.updateProduct(id, this.prodUpdateForm.value).subscribe(res=>{
      this.router.navigate(['/product'])
      this.loading = false
      this.toastrService.success('Product Updated')
    }, err => {
      this.loading = false
    })
  }

}
