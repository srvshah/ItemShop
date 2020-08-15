import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { TransactionModel } from 'src/app/transaction/models/transaction';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InvoiceService } from '../invoice.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  invoiceId: number
  ELEMENT_DATA : Array<TransactionModel>
  displayedColumns: string[] = ['id', 'customerName', 'productName', 'quantity', 'rate','total','createdAt', 'updatedAt', 'transactionStatus'];
  dataSource = new MatTableDataSource<TransactionModel>(this.ELEMENT_DATA) ;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    this.invoiceId = this.data['id']
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    this.fetchInvoiceTransactions()
  }

  fetchInvoiceTransactions(){
    this.invoiceService.transactions(this.invoiceId).subscribe(res => {
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
