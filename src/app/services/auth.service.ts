import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;


  signup(signupForm: any) {
    return this.http.post(this.apiUrl + "/user/signup", signupForm);
  }

  login(loginForm: any): Observable<Object> {
    console.log('username:', loginForm.userName);
    return this.http.post(this.apiUrl + "/user/login", loginForm);
  }

  logout(): void {
    const logoutUserName = localStorage.removeItem('userName');
    console.log("logoutUserName:", logoutUserName);
  }
}
