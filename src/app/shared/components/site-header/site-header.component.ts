import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-site-header',
  standalone: false,
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent {
  searchText = '';

  constructor(
    private router: Router,
    public auth: AuthService
  ) {}

  search(): void {
    if (this.searchText.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchText.trim() } });
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}