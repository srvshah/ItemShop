import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CustomerModel } from './../models/customer'
import { ToastrService } from 'ngx-toastr';
import {CustTransactionComponent} from './../cust-transaction/cust-transaction.component'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  loading =false
  ELEMENT_DATA : Array<CustomerModel>
  displayedColumns: string[] = ['id', 'name', 'address', 'phone', 'gender','actions'];
  dataSource = new MatTableDataSource<CustomerModel>(this.ELEMENT_DATA) ;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    this.fetchCustomers()

  }

  genderParser = {
    '0': 'Unknown',
    '1': 'Male',
    '2': 'Female'
  }
  
  fetchCustomers(){
    this.loading = true
    this.customerService.listCustomer().subscribe(res => {
      res.forEach(element => {
        element['gender'] = this.genderParser[element['gender']]
      });
      this.dataSource.data = res as Array<CustomerModel>
      this.loading = false
    });
    
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
  
  delete(id){
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Customer'
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.customerService.deleteCustomer(id).subscribe(res => {
          this.fetchCustomers()
          this.toastrService.success('Customer Deleted')
        })
      }
    })
  }

  edit(id){
    this.router.navigate(['/customer/'+ id +'/edit'])
  }
  showCustomerTransaction(id, name){
    const dialogRef = this.dialog.open(CustTransactionComponent, {
      width: '900px',
      data: {id, name}
    })
    dialogRef.afterClosed().subscribe(res => {
      
    })
  }
}
