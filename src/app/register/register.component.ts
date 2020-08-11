import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  loading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.registerForm = this.fb.group({
      'username': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['dashboard'])
    }
  }

  register(){
    this.loading = true

    this.authService.register(this.registerForm.value).subscribe(res => {
      this.loading = false
    }, err => {
      this.loading = false
    })
    
  }
}
