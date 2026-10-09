import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../core/services/review.service';
import { AuthService } from '../../../core/services/auth.service';
import { Comment, Review } from '../../../shared/models/review.model';

@Component({
  selector: 'app-product-review',
  standalone: false,
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {
  reviewId = '';
  review: Review | null = null;
  comments: Comment[] = [];
  loading = true;
  error = '';

  newCommentText = '';
  submittingComment = false;
  commentError = '';

  reportReason = '';
  reporting = false;
  showReportModal = false;
  reportSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.reviewId = params.get('id') || params.get('productId') || '';
      if (this.reviewId) {
        this.loadReviewDetails();
      }
    });
  }

  loadReviewDetails(): void {
    this.loading = true;
    this.reviewService.getReview(this.reviewId).subscribe({
      next: (data) => {
        this.review = data;
        this.loading = false;
        this.loadComments();
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Review not found or not published.';
      }
    });
  }

  loadComments(): void {
    this.reviewService.getComments(this.reviewId).subscribe({
      next: (data) => { this.comments = data; },
      error: () => {}
    });
  }

  markHelpful(): void {
    if (!this.auth.isAuthenticated()) {
      alert('Please sign in to vote on review helpfulness.');
      return;
    }
    if (!this.review) return;
    this.reviewService.markHelpful(this.review.id).subscribe({
      next: (res) => {
        if (this.review) {
          this.review.helpfulVoteCount = res.helpfulVoteCount;
        }
      },
      error: (err) => {
        alert(err?.error?.message || 'Could not record vote.');
      }
    });
  }

  submitComment(): void {
    if (!this.auth.isAuthenticated()) {
      alert('Please sign in to post comments.');
      return;
    }
    if (!this.newCommentText.trim()) return;

    this.submittingComment = true;
    this.commentError = '';
    this.reviewService.addComment(this.reviewId, this.newCommentText.trim()).subscribe({
      next: (comment) => {
        this.comments.push(comment);
        this.newCommentText = '';
        this.submittingComment = false;
      },
      error: (err) => {
        this.submittingComment = false;
        this.commentError = err?.error?.message || 'Failed to post comment.';
      }
    });
  }

  submitReport(): void {
    if (!this.auth.isAuthenticated()) {
      alert('Please sign in to report a review.');
      return;
    }
    if (!this.reportReason.trim()) return;

    this.reporting = true;
    this.reviewService.reportReview(this.reviewId, this.reportReason.trim()).subscribe({
      next: () => {
        this.reporting = false;
        this.reportSuccess = true;
        setTimeout(() => {
          this.showReportModal = false;
          this.reportSuccess = false;
          this.reportReason = '';
        }, 2000);
      },
      error: (err) => {
        this.reporting = false;
        alert(err?.error?.message || 'Failed to submit report.');
      }
    });
  }
}