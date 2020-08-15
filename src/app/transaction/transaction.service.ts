import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TransactionModel} from './models/transaction'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionUrl = environment.apiUrl + '/transactions'
  constructor(
    private http: HttpClient
  ) { 
  }

  listTransactions() : Observable<TransactionModel[]>{
    return this.http.get<TransactionModel[]>(this.transactionUrl)
  }
  getTransaction(id): Observable<TransactionModel>{
    return this.http.get<TransactionModel>(this.transactionUrl + '/' + id)
  }

  create(data) {
    return this.http.post(this.transactionUrl, data)
  }

  deleteTransaction(id){
    return this.http.delete(this.transactionUrl+'/'+id);
  }

  updateTransaction(id, data){
    return this.http.put(this.transactionUrl+'/'+id, data)
  }
}
