import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  //signal
  isMenuOpen = signal(true);

  //toggle menu
  toggleMenu() {
    this.isMenuOpen.update((isOpen => !isOpen));
  }
}
