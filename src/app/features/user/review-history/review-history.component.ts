import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Review } from '../../../shared/models/review.model';

@Component({
  selector: 'app-review-history',
  templateUrl: './review-history.component.html',
  styleUrls: ['./review-history.component.css']
})
export class ReviewHistoryComponent implements OnInit {
  reviews: Review[] = [];
  loading = true;
  searchTerm = '';
  statusFilter = 'ALL';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.loading = true;
    this.userService.getDashboard().subscribe({
      next: (data) => {
        this.reviews = data.reviews || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get filteredReviews(): Review[] {
    return this.reviews.filter(r => {
      const matchesSearch = !this.searchTerm ||
        r.productName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.headline?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.category?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = this.statusFilter === 'ALL' || r.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }
}
