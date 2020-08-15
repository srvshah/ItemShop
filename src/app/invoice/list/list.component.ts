import { Component, OnInit, ViewChild } from '@angular/core';
import {InvoiceService} from './../invoice.service'
import { InvoiceModel } from './../models/Invoice'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
import { Toast, ToastrService } from 'ngx-toastr';
import { CreateComponent } from 'src/app/invoice/create/create.component';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  loading = false
  ELEMENT_DATA : Array<InvoiceModel>
  displayedColumns: string[] = ['id', 'invoiceDate', 'customerName', 'customerId', 'invoiceTotal', 'actions'];
  dataSource = new MatTableDataSource<InvoiceModel>(this.ELEMENT_DATA) ;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchInvoices()
  }
  fetchInvoices(){
    this.loading = true
    this.invoiceService.list().subscribe(res => {
      res.forEach(element => {
        element['invoiceDate'] = element['invoiceDate'].split('T')[0]
        
      });
      this.dataSource.data = res
      this.loading = false 

    })
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
  create(){
    const dialogRef = this.dialog.open(CreateComponent)
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.fetchInvoices()
      }
    })
  }

  detail(id){
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '900px',
      data: {id}
    })
    dialogRef.afterClosed().subscribe(res => {
    })
  }

  delete(id){
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Invoice'
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.invoiceService.delete(id).subscribe(res => {
          this.toastr.success('deleted invoice')
          this.fetchInvoices()
        })
      }
    })
   
  }

}
