import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface CredifyReviewCardData {
  reviewer: string;
  reviewerLevel: string;
  product: string;
  title: string;
  body: string;
  rating: number;
  credibilityScore: number;
  date: string;
  helpfulCount: number;
  verified?: boolean;
}

@Component({
  selector: 'app-review-card',
  standalone: false,
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input() review: CredifyReviewCardData = {
    reviewer: '', reviewerLevel: '', product: '', title: '', body: '',
    rating: 0, credibilityScore: 0, date: '', helpfulCount: 0
  };
  @Output() helpful = new EventEmitter<void>();
  helpfulClicked = false;
  markHelpful(): void {
    if (!this.helpfulClicked) {
      this.helpfulClicked = true;
      this.helpful.emit();
    }
  }
}