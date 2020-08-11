import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = environment.apiUrl + '/products'
  constructor(
    private http: HttpClient
  ) { }

  listProduct() : Observable<any>{
    return this.http.get(this.productUrl)
  }
}
