import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);

  private userService = inject(UserService);

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  signup(signupData: any) {
    return this.http.post(this.apiUrl + "/user/signup", signupData);
  }

  login(credentials: any): Observable<User> {
    //passing the headers with the httpbasic
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    });
    return this.http.post(this.apiUrl + "/user/login", credentials, { headers });
  }

  logout(): void {
    localStorage.removeItem('Authorization');
    this.userService.clearUser()
    this.router.navigate(['/login']);
  }

  isLoggedin(): boolean {
    if (localStorage.getItem('Authorization')) {
      return true;
    } else {
      return false;
    }
  }
}
