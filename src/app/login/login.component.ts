import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private app: AppComponent
  ) {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
    if(this.authService.isAuthenticated()){
      this.router.navigate(['dashboard'])
    }
  }
  login(){
    this.loading = true
    this.authService.login(this.loginForm.value).subscribe(res => {
      this.authService.saveToken(res['token'])
      this.authService.saveUsername(res['username'])
      this.app.ngOnInit()
      this.loading = false 
      this.router.navigate(['dashboard'])
    }, err => {
      this.loading = false
      console.log(err)
    })
    
  }

}
