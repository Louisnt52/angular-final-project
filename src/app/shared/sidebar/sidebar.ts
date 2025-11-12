import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../pages/users/user/interfaces/user.interface';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
})
export default class Sidebar {
  currentUser$: Observable<User | null>

  constructor(public authService: AuthService) { 
    this.currentUser$ = this.authService.currentUser;
  }
  
  logout() {
    this.authService.logout();
  }
}
