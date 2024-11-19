import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router)

  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem('userName')
    if (storedUsername) {
      this.userSignal.set({ userName: storedUsername });
    }
  }

  private apiUrl = environment.apiUrl;


  //user signal related to user tasks
  private userSignal = signal<User | null>(null);

  setUser(user: User): void {
    this.userSignal.set(user);
  }

  getUser(): Signal<User | null> {
    return this.userSignal;
  }

  clearUser() {
    this.userSignal.set(null);
  }

  signup(signupData: any) {
    return this.http.post(this.apiUrl + "/user/signup", signupData);
  }

  login(credentials: any): Observable<User> {
    return this.http.post(this.apiUrl + "/user/login", credentials);
  }

  logout(): void {
    const logoutUserName = localStorage.removeItem('userName');
    console.log("logoutUserName:", logoutUserName);
    this.router.navigate(['/login']);
  }

  isLoggedin(): boolean {
    if (this.userSignal() || localStorage.getItem('userName')) {
      return true;
    } else {
      return false;
    }
  }
}
