import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  //DI
  private userService = inject(UserService);

  user = this.userService.getUser();


  constructor() { }


  ngOnInit(): void {
    this.userService.loadUserData();
  }
}
