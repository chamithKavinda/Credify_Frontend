import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: false,
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent {
  searchText = '';
  constructor(private router: Router) {}
  search(): void { this.router.navigate(['/search'], { queryParams: { q: this.searchText.trim() } }); }
}