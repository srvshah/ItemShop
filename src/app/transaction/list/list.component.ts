import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionModel } from '../models/transaction';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TransactionService } from '../transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from 'src/app/transaction/create/create.component';
import { ToastrService } from 'ngx-toastr';
import { UpdateComponent } from 'src/app/transaction/update/update.component';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  loading =false
  ELEMENT_DATA : Array<TransactionModel>
  displayedColumns: string[] = ['id', 'customerName', 'productName', 'quantity', 'rate','total','invoiceId', 'createdAt', 'updatedAt', 'transactionStatus', 'actions'];
  dataSource = new MatTableDataSource<TransactionModel>(this.ELEMENT_DATA) ;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    this.fetchTransactions()
  }

  fetchTransactions(){
    this.loading = true
    this.transactionService.listTransactions().subscribe(res => {
      res.forEach(element => {
        element['createdAt'] = element['createdAt'].split('T')[0]
        element['updatedAt'] != null ? element['updatedAt'] = element['updatedAt'].split('T')[0] : ''
       
      });
      this.dataSource.data = res as TransactionModel[]
      this.loading = false
    })
  }
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  create(){
    const dialogRef = this.dialog.open(CreateComponent)
    dialogRef.afterClosed().subscribe(res => {
        this.fetchTransactions()
    })
  }
  
  edit(id){
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: {id}
    })
    dialogRef.afterClosed().subscribe(res => {
      
        this.fetchTransactions()
      
    })
  }

  delete(id){
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Transaction'
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.transactionService.deleteTransaction(id).subscribe(res => {
          this.toastr.success('Transaction Deleted')
          this.fetchTransactions()
        })
      }
    })
  }
}
