import { Component, inject, Signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  //DI
  private userService = inject(UserService);
  private authService = inject(AuthService);

  userSignal: Signal<User | null> = this.authService.getUser();


  constructor() {
    this.userSignal = this.authService.getUser();
    this.onGetUserProfile(this.userSignal()?.userName);
  }

  onGetUserProfile(username: string | undefined) {
    this.userService.getUserProfile(username)
      .subscribe(
        {
          next: (res: any) => {
            this.authService.setUser(res.data);
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
      );

  }
}
