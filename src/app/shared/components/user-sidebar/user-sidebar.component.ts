import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  get initials(): string {
    const user = this.auth.currentUser;
    if (!user) return 'U';
    return `${(user.firstName || 'U')[0]}${(user.lastName || '')[0] || ''}`.toUpperCase();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/sign-in']);
  }
}
