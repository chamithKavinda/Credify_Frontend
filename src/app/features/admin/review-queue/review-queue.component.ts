import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { AdminDashboardSummary } from '../../../shared/models/dashboard.model';
import { Review } from '../../../shared/models/review.model';

@Component({
  selector: 'app-review-queue',
  standalone: false,
  templateUrl: './review-queue.component.html',
  styleUrls: ['./review-queue.component.css']
})
export class ReviewQueueComponent implements OnInit {
  stats: AdminDashboardSummary | null = null;
  pendingReviews: Review[] = [];
  loading = true;
  actionMessage = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.adminService.getDashboard().subscribe({
      next: (dashboard) => { this.stats = dashboard; }
    });

    this.adminService.getReviewQueue().subscribe({
      next: (queue) => {
        this.pendingReviews = queue;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  moderate(reviewId: string, decision: 'PUBLISHED' | 'HIDDEN' | 'REMOVED'): void {
    this.actionMessage = '';
    this.adminService.moderateReview(reviewId, decision).subscribe({
      next: () => {
        this.actionMessage = `Review status updated to ${decision}.`;
        this.loadData();
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to update review status.');
      }
    });
  }
}
