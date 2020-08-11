import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products = []
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    this.productService.listProduct().subscribe(res => {
      this.products = res
      console.log(this.products)
    });
    

  }

}
