import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from '../../../core/services/review.service';

@Component({
  selector: 'app-submit-review',
  standalone: false,
  templateUrl: './submit-review.component.html',
  styleUrls: ['./submit-review.component.css']
})
export class SubmitReviewComponent {
  productName = '';
  category = 'Audio & Wearables';
  headline = '';
  ratingValue = 5;
  reviewText = '';

  loading = false;
  error = '';
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
    private reviewService: ReviewService,
    private router: Router
  ) {}

  submit(): void {
    this.error = '';
    if (!this.productName.trim() || !this.headline.trim() || !this.reviewText.trim()) {
      this.error = 'Please fill out all required fields.';
      return;
    }
    if (this.reviewText.trim().length < 10) {
      this.error = 'Review text must be at least 10 characters long.';
      return;
    }

    this.loading = true;
    this.reviewService.create({
      productName: this.productName.trim(),
      category: this.category,
      headline: this.headline.trim(),
      ratingValue: this.ratingValue,
      reviewText: this.reviewText.trim()
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/user/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to submit review. Please try again.';
      }
    });
  }
}
