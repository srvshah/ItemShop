import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionModel } from 'src/app/transaction/models/transaction';

@Component({
  selector: 'app-cust-transaction',
  templateUrl: './cust-transaction.component.html',
  styleUrls: ['./cust-transaction.component.css']
})
export class CustTransactionComponent implements OnInit {
  customerId: number
  customerName: string
  ELEMENT_DATA : Array<TransactionModel>
  displayedColumns: string[] = ['id', 'productName', 'quantity', 'rate','total','invoiceId', 'createdAt', 'updatedAt', 'transactionStatus'];
  dataSource = new MatTableDataSource<TransactionModel>(this.ELEMENT_DATA) ;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerId = this.data['id']
    this.customerName = this.data['name']
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    this.fetchCustomerTransactions()
  }

  fetchCustomerTransactions(){
    this.customerService.transactions(this.customerId).subscribe(res => {
      res.forEach(element => {
        element['createdAt'] = element['createdAt'].split('T')[0]
        element['updatedAt'] != null ? element['updatedAt'] = element['updatedAt'].split('T')[0] : ''
        element['transactionStatus']  == '0' ? element['transactionStatus'] = 'Processing': 'Complete'
      });
      this.dataSource.data = res as TransactionModel[]
    })
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
