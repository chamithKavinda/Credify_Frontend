import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ProductCard {
  category: string;
  name: string;
  description: string;
  rating: string;
  score: number;
  reviews: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchText = '';
  selectedCategory = 'All Categories';
  categories = ['Consumer Electronics', 'Productivity Software', 'Smart Home', 'Travel Gear', 'Financial Services'];

  products: ProductCard[] = [
    { category: 'CONSUMER TECH', name: 'Aura SoundLink Pro', description: 'Premium active noise-cancelling headphones', rating: '4.4', score: 94, reviews: '1,280', icon: '🎧' },
    { category: 'SAAS & SOFTWARE', name: 'PulseFlow Suite', description: 'Enterprise async workflow platform', rating: '4.1', score: 98, reviews: '342', icon: '▣' },
    { category: 'SMART HOME', name: 'NovaPure Ultra', description: 'True HEPA H14 smart filtration system', rating: '4.7', score: 91, reviews: '910', icon: '⌂' }
  ];

  constructor(private router: Router) {}

  search(): void {
    const query = this.searchText.trim();
    this.router.navigate(['/search'], { queryParams: { q: query, category: this.selectedCategory } });
  }
}