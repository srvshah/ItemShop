import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { InvoiceModel } from './models/Invoice';
import { TransactionModel } from '../transaction/models/transaction';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  invoiceUrl = environment.apiUrl + '/invoices'
  constructor(
    private http: HttpClient
  ) { }

  list() : Observable<InvoiceModel[]>{
    return this.http.get<InvoiceModel[]>(this.invoiceUrl)
  }

  transactions(id): Observable<TransactionModel[]>{
    return this.http.get<TransactionModel[]>(`${this.invoiceUrl}/${id}/transactions`)
  }

  delete(id){
    return this.http.delete(this.invoiceUrl + '/'+ id)
  }
  generate(data){
    return this.http.post(this.invoiceUrl, data)
  }
}
