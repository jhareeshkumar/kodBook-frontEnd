import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  //user signal related to user tasks
  private user = signal<User | null>(null);

  constructor(private http: HttpClient) { }

  setUser(user: User): void {
    this.user.set(user);
  }

  getUser(): Signal<User | null> {
    return this.user;
  }

  clearUser() {
    this.user.set(null);
  }

  //userSpecific Tasks

  getUserProfile(username: string | undefined) {
    return this.http.get(this.apiUrl + '/user/profile/' + username).subscribe(
      {
        next: (res: any) => {
          this.setUser(res.data);
          console.log("profile:", res)
        },
        error(error: any) {
          if (error.status == 0) {
            console.log("server Unavailable", error);
          } else {
            console.log("Backenderror:", error.error);
          }
        },
        complete() {
          console.log("GET REQUEST SUCCESSFUL")
        }
      }
    );;
  }


  loadUserData() {
    if (this.user()?.bio) {
      // return;
    }
    else {
      const authHeader = localStorage.getItem('Authorization');
      if (authHeader && authHeader.startsWith('Basic ')) {
        const username = atob(authHeader.split(' ')[1]).split(':')[0];
        this.getUserProfile(username);
      }
    }
  }

  getPublicUserProfile(username: string) {
    return this.http.get(this.apiUrl + "/user/profile/" + username);
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post(this.apiUrl + '/user/change-password', { currentPassword, newPassword });
  }
}
