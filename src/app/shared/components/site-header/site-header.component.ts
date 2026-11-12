import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent {
  searchText = '';
  mobileMenuOpen = false;
  scrollProgress = 0;
  isScrolled = false;

  constructor(
    private router: Router,
    public auth: AuthService
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window === 'undefined') return;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollY > 20;

    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const totalScroll = docHeight - winHeight;
    this.scrollProgress = totalScroll > 0 ? Math.min(100, Math.max(0, (scrollY / totalScroll) * 100)) : 0;
  }

  get initials(): string {
    const user = this.auth.currentUser;
    if (!user) return 'U';
    return `${(user.firstName || 'U')[0]}${(user.lastName || '')[0] || ''}`.toUpperCase();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  search(): void {
    if (this.searchText.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchText.trim() } });
      this.mobileMenuOpen = false;
    }
  }

  logout(): void {
    this.auth.logout();
    this.mobileMenuOpen = false;
    this.router.navigate(['/']);
  }
}
