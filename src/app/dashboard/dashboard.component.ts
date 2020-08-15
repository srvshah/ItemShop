import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ProductService } from '../product/product.service';
import { ProductModel } from '../product/models/product';
import { CustomerModel } from '../customer/models/customer';
import { CustomerService } from '../customer/customer.service';
import { TransactionService } from '../transaction/transaction.service';
import { InvoiceService } from '../invoice/invoice.service';
import { TransactionModel } from '../transaction/models/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string
  productCount: number
  customerCount: number
  pendingTransactions: number
  completeTransactions: number
  invoiceCount: number
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private customerService: CustomerService,
    private transactionService: TransactionService,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername()
    this.productService.listProduct().subscribe(res => {
      this.productCount = res.length
    })

    this.customerService.listCustomer().subscribe(res => {
      this.customerCount = res.length
    })

    this.transactionService.listTransactions().subscribe(res => {
      let results = res.filter(item => item['transactionStatus'] == 'Processing')
      this.pendingTransactions = results.length
      results = res.filter(item => item['transactionStatus'] == 'Complete')
      this.completeTransactions = results.length

    })

    this.invoiceService.list().subscribe(res => {
      this.invoiceCount = res.length
    })

  }

}
