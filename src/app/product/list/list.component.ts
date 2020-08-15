import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductModel } from '../models/product';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ConfirmationComponent} from 'src/app/confirmation/confirmation.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  loading = false
  ELEMENT_DATA : Array<ProductModel>
  displayedColumns: string[] = ['id', 'name', 'price', 'imageUrl', 'actions'];
  dataSource = new MatTableDataSource<ProductModel>(this.ELEMENT_DATA) ;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    this.fetchProducts()

  }

  fetchProducts(){
    this.loading = true
    this.productService.listProduct().subscribe(res => {
      this.dataSource.data = res as Array<ProductModel>
      this.loading = false
    });
    
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
  
  delete(id){
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Product'
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.productService.deleteProduct(id).subscribe(res => {
          this.fetchProducts()
          this.toastrService.success('Product Deleted')
        })
      }
      
    })

  }

  edit(id){
    this.router.navigate(['/product/'+ id +'/edit'])
  }

}
