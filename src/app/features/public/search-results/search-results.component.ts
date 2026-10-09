import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../../core/services/review.service';
import { Review } from '../../../shared/models/review.model';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  query = '';
  category = 'All categories';
  minRating = 0;
  sort = 'newest';
  loading = false;
  reviews: Review[] = [];

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.query = params.get('q') || '';
      if (params.get('category')) {
        this.category = params.get('category') || 'All categories';
      }
      this.fetchReviews();
    });
  }

  fetchReviews(): void {
    this.loading = true;
    this.reviewService.listReviews({
      q: this.query,
      category: this.category === 'All categories' ? undefined : this.category,
      minRating: this.minRating > 0 ? this.minRating : undefined,
      sort: this.sort
    }).subscribe({
      next: (data) => {
        this.reviews = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.fetchReviews();
  }

  onCategoryChange(): void {
    this.fetchReviews();
  }

  clearFilters(): void {
    this.query = '';
    this.category = 'All categories';
    this.minRating = 0;
    this.sort = 'newest';
    this.router.navigate(['/search']);
    this.fetchReviews();
  }
}