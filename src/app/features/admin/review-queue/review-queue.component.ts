import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { AdminDashboardSummary } from '../../../shared/models/dashboard.model';
import { Review } from '../../../shared/models/review.model';

@Component({
  selector: 'app-review-queue',
  templateUrl: './review-queue.component.html',
  styleUrls: ['./review-queue.component.css']
})
export class ReviewQueueComponent implements OnInit {
  stats: AdminDashboardSummary | null = null;
  pendingReviews: Review[] = [];
  loading = true;
  actionMessage = '';
  searchTerm = '';
  selectedStatusFilter = 'ALL';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadData();
  }

  get filteredReviews(): Review[] {
    return this.pendingReviews.filter(r => {
      const matchesSearch = !this.searchTerm ||
        r.productName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.headline?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.category?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.selectedStatusFilter === 'ALL' ||
        r.authenticityStatus === this.selectedStatusFilter;

      return matchesSearch && matchesStatus;
    });
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
        this.actionMessage = `Review status successfully updated to ${decision}.`;
        this.loadData();
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to update review status.');
      }
    });
  }
}
