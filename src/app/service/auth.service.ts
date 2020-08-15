import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = environment.apiUrl + '/identity/login'
  registerUrl = environment.apiUrl + '/identity/register'
  constructor(
    private http: HttpClient,
  ) { }

  login(data): Observable<any>{ 
    return this.http.post(this.loginUrl, data)
  }

  register(data): Observable<any>{ 
    return this.http.post(this.registerUrl, data)
  }


  saveToken(token){
    localStorage.setItem('token',token)
  }
  
  saveUsername(username){
    localStorage.setItem('username',username)

  }
  getUsername(){
    return localStorage.getItem('username')
  }
  getToken(){
    return localStorage.getItem('token')
  }

  isAuthenticated(){
    if(this.getToken()){
      return true
    }
    return false
  }

  removeToken(){
    localStorage.removeItem('token')
  }
  removeUsername(){
    localStorage.removeItem('username')
  }

}
