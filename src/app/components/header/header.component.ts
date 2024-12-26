import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  //dependency injections
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private toastr = inject(ToastrService);

  isMenuOpen = false; // Track mobile menu state

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedin();
  }

  onLogout(): void {
    this.toastr.success('You have been logged out. See you again soon!', 'Logged Out Successfully!');
    this.userService.clearUser();
    this.authService.logout();

  }
  getUsername(): string | undefined {
    const userSignal = this.userService.getUser();
    return userSignal()?.username;
  }
}
