import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  private route = inject(Router)

  onLogout(): void {
    const logoutUserName = localStorage.removeItem('userName');
    console.log("logoutUserName:", logoutUserName);
    this.route.navigate(['/login']);
  }
}
