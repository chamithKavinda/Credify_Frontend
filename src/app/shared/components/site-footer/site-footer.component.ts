import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  standalone: false,
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css']
})
export class SiteFooterComponent {
  showScrollTop = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window === 'undefined') return;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showScrollTop = scrollY > 280;
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
