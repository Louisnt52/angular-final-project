import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Sidebar from "../../shared/sidebar/sidebar";
import { RouterOutlet } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, Sidebar, RouterOutlet],
  templateUrl: './main-layout.html',
})
export default class MainLayout {
  constructor(public authService: AuthService) { }
}
