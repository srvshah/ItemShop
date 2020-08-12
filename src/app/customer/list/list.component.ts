import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CustomerModel } from './../models/customer'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ELEMENT_DATA : Array<CustomerModel>
  displayedColumns: string[] = ['id', 'name', 'address', 'phone', 'gender','actions'];
  dataSource = new MatTableDataSource<CustomerModel>(this.ELEMENT_DATA) ;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    this.fetchProducts()

  }

  fetchProducts(){
    this.customerService.listCustomer().subscribe(res => {
      this.dataSource.data = res as Array<CustomerModel>
    });
    
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
  
  delete(id){
    if(confirm('are you sure?')){
      this.customerService.deleteCustomer(id).subscribe(res => {
        this.fetchProducts()
      })
    }
  }

  edit(id){
    this.router.navigate(['/customer/'+ id +'/edit'])
  }
}
