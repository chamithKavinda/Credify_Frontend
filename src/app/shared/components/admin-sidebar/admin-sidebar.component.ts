import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  get initials(): string {
    const user = this.auth.currentUser;
    if (!user) return 'AD';
    return `${(user.firstName || 'A')[0]}${(user.lastName || 'D')[0]}`.toUpperCase();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/sign-in']);
  }
}
