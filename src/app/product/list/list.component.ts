import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductModel } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ELEMENT_DATA : Array<ProductModel>
  displayedColumns: string[] = ['id', 'name', 'price', 'imageUrl', 'actions'];
  dataSource = new MatTableDataSource<ProductModel>(this.ELEMENT_DATA) ;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    this.fetchProducts()

  }

  fetchProducts(){
    this.productService.listProduct().subscribe(res => {
      this.dataSource.data = res as Array<ProductModel>
    });
    
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
  
  delete(id){
    if(confirm('are you sure?')){
      this.productService.deleteProduct(id).subscribe(res => {
        this.fetchProducts()
      })
    }
  }

  edit(id){
    this.router.navigate(['/product/'+ id +'/edit'])
  }

}
