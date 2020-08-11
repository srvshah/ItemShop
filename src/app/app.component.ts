import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit   {
  title = 'Client';
  isAuthenticated = false
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    

  }
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.isAuthenticated = true
    }
  }

  logout(){
    this.authService.removeToken()
    location.reload()
    this.router.navigate([''])
  }
  
}
