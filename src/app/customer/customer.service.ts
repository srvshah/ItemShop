import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerModel } from './models/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerUrl = environment.apiUrl + '/customers'
  constructor(
    private http: HttpClient
  ) { }


  listCustomer(): Observable<Array<CustomerModel>>{
    return this.http.get<Array<CustomerModel>>(this.customerUrl)
  }
  
  createCustomer(data){
    data['gender'] = Number(data.gender)
    return this.http.post(this.customerUrl, data)
  }
  deleteCustomer(id){
    return this.http.delete(this.customerUrl+ '/' + id)
  }

  getCustomer(id): Observable<CustomerModel>{
    return this.http.get<CustomerModel>(this.customerUrl+ '/' + id)
  }

  updateCustomer(id, data){
    data['gender'] = Number(data.gender)
    return this.http.put(this.customerUrl+ '/' + id, data)
  }
}
