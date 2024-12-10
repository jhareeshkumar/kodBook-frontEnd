import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.scss'
})
export class PublicProfileComponent implements OnInit {
  private userService = inject(UserService);

  user!: User | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.user)
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.getUserPublicProfile(username);
    }
  }

  getUserPublicProfile(username: string) {
    this.userService.getPublicUserProfile(username).subscribe({
      next: (response: User | any) => {
        this.user = response.data;
        console.log("public User : ", response);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
