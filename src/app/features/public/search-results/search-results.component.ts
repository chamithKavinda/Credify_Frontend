import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface SearchProduct { id: string; category: string; name: string; description: string; rating: number; score: number; reviews: string; icon: string; status: 'trusted' | 'risk'; }

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  query = '';
  minScore = 0;
  category = 'All categories';
  products: SearchProduct[] = [
    { id: 'sony-wh-1000xm5', category: 'Consumer Electronics', name: 'Sony WH-1000XM5 Wireless Headphones', description: 'Verified purchase signals, deep product testing notes and authentic community feedback.', rating: 4.8, score: 94, reviews: '1,420', icon: '🎧', status: 'trusted' },
    { id: 'bose-qc-ultra', category: 'Consumer Electronics', name: 'Bose QuietComfort Ultra Headphones', description: 'Long-term owner reviews with purchase proof and organic sentiment distribution.', rating: 4.5, score: 91, reviews: '890', icon: '🎧', status: 'trusted' },
    { id: 'swiftcharge-65w', category: 'Consumer Electronics', name: 'SwiftCharge GaN Pro 65W Adapter', description: 'Unusual review burst detected. Several reviews are awaiting moderator review.', rating: 4.9, score: 38, reviews: '142', icon: '🔌', status: 'risk' },
    { id: 'pulseflow', category: 'Productivity Software', name: 'PulseFlow Suite', description: 'Workspace feedback and verified subscriptions analyzed by Credify.', rating: 4.1, score: 98, reviews: '342', icon: '▣', status: 'trusted' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void { this.route.queryParamMap.subscribe(params => this.query = params.get('q') || ''); }
  get filteredProducts(): SearchProduct[] {
    const term = this.query.toLowerCase();
    return this.products.filter(p => (this.category === 'All categories' || p.category === this.category) && p.score >= this.minScore && (!term || `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term)));
  }
  clearFilters(): void { this.query = ''; this.category = 'All categories'; this.minScore = 0; this.router.navigate(['/search']); }
}