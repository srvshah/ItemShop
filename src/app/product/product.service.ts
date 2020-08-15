import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductModel } from './models/product'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = environment.apiUrl + '/products'
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  listProduct() : Observable<Array<ProductModel>>{
    return this.http.get<Array<ProductModel>>(this.productUrl)
  }

  createProduct(data){
    return this.http.post(this.productUrl, data)
  }

  getProduct(id): Observable<ProductModel>{
    return this.http.get<ProductModel>(this.productUrl + '/' + id)
  }

  updateProduct(id, data){
    return this.http.put(this.productUrl + '/' + id, data)
  }

  deleteProduct(id){
    return this.http.delete(this.productUrl + '/' + id)
  }

  out: number
  getProductCount(){
    this.listProduct().subscribe(res => this.out = res.length)
    return this.out
  }
}
