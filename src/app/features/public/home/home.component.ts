import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from '../../../core/services/review.service';
import { Review } from '../../../shared/models/review.model';

interface FeaturedProduct {
  id?: string;
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
export class HomeComponent implements OnInit {
  searchText = '';
  selectedCategory = 'All Categories';
  categories = [
    'Audio & Wearables',
    'Computing & Laptops',
    'Mice & Keyboards',
    'Speakers & Acoustics',
    'Smartphones & Mobiles',
    'Digital Displays & TVs',
    'Cameras & Digital Gear',
    'Power & Chargers'
  ];

  products: FeaturedProduct[] = [
    { id: '1', category: 'COMPUTING & LAPTOPS', name: 'Apple MacBook Pro 16" (M3 Max)', description: 'Liquid Retina XDR screen with M3 Max processing engine.', rating: '5.0', score: 94, reviews: '31', icon: '💻' },
    { id: '2', category: 'AUDIO & WEARABLES', name: 'Sony WH-1000XM5 ANC Headphones', description: '30-hour battery life and industry-leading noise cancellation.', rating: '5.0', score: 96, reviews: '42', icon: '🎧' },
    { id: '3', category: 'MICE & ACCESSORIES', name: 'Logitech MX Master 3S Wireless Mouse', description: 'Quiet 8,000 DPI tracking on glass with MagSpeed wheel.', rating: '5.0', score: 95, reviews: '38', icon: '🖱️' },
    { id: '4', category: 'SPEAKERS & ACOUSTICS', name: 'Sonos Era 300 Smart Speaker', description: 'Six driver Dolby Atmos spatial audio home acoustics.', rating: '5.0', score: 93, reviews: '29', icon: '🔊' },
    { id: '5', category: 'MICE & ACCESSORIES', name: 'Keychron Q1 Pro Mechanical Keyboard', description: 'CNC aluminum double-gasket custom wireless keyboard.', rating: '5.0', score: 92, reviews: '26', icon: '⌨️' },
    { id: '6', category: 'COMPUTING & LAPTOPS', name: 'ASUS ROG Zephyrus G16 OLED Gaming Laptop', description: '240Hz ROG Nebula OLED display with RTX 4080 GPU.', rating: '4.0', score: 90, reviews: '21', icon: '💻' }
  ];

  constructor(private router: Router, private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.listReviews({ sort: 'newest' }).subscribe({
      next: (data: Review[]) => {
        if (data && data.length > 0) {
          this.products = data.map(r => ({
            id: r.id,
            category: r.category ? r.category.toUpperCase() : 'ELECTRONICS',
            name: r.productName,
            description: r.headline + ' — ' + r.reviewText.substring(0, 100) + '...',
            rating: `${r.ratingValue}.0`,
            score: Math.round(r.credibilityScore || 85),
            reviews: `${r.helpfulVoteCount || 1}`,
            icon: this.getIconForCategory(r.category, r.productName)
          }));
        }
      },
      error: () => {}
    });
  }

  getIconForCategory(category?: string, name?: string): string {
    const text = ((category || '') + ' ' + (name || '')).toLowerCase();
    if (text.includes('mouse') || text.includes('mice')) return '🖱️';
    if (text.includes('keyboard')) return '⌨️';
    if (text.includes('speaker')) return '🔊';
    if (text.includes('headphone') || text.includes('earbud') || text.includes('audio')) return '🎧';
    if (text.includes('laptop') || text.includes('macbook') || text.includes('computing')) return '💻';
    if (text.includes('phone') || text.includes('mobile') || text.includes('galaxy')) return '📱';
    if (text.includes('display') || text.includes('tv') || text.includes('oled')) return '🖥️';
    if (text.includes('camera') || text.includes('photo') || text.includes('gear')) return '📷';
    if (text.includes('power') || text.includes('charger') || text.includes('battery')) return '⚡';
    return '⚡';
  }

  search(): void {
    const query = this.searchText.trim();
    this.router.navigate(['/search'], { queryParams: { q: query, category: this.selectedCategory } });
  }
}