import { Component } from '@angular/core';

interface ManagedReview { product: string; reviewer: string; stars: number; score: number; status: string; date: string; }

@Component({
  selector: 'app-review-management',
  standalone: false,
  templateUrl: './review-management.component.html',
  styleUrls: ['./review-management.component.css']
})
export class ReviewManagementComponent {
  filter = 'All';
  query = '';
  reviews: ManagedReview[] = [
    { product: 'Sony WH-1000XM5 Headphones', reviewer: 'Elena Rostova', stars: 5, score: 96, status: 'Published', date: 'May 12, 2024' },
    { product: 'SwiftCharge 65W Adapter', reviewer: 'User_88291', stars: 5, score: 24, status: 'Flagged', date: 'Today' },
    { product: 'Keychron K8 Pro Keyboard', reviewer: 'Marcus Chen', stars: 4, score: 91, status: 'Published', date: 'April 28, 2024' },
    { product: 'NovaPure Ultra Filter', reviewer: 'reviewer_73', stars: 1, score: 45, status: 'Under Review', date: 'Yesterday' }
  ];
  get filteredReviews(): ManagedReview[] {
    const q = this.query.toLowerCase();
    return this.reviews.filter(r => (this.filter === 'All' || r.status === this.filter) && (!q || `${r.product} ${r.reviewer}`.toLowerCase().includes(q)));
  }
  updateStatus(review: ManagedReview, status: string): void { review.status = status; }
}