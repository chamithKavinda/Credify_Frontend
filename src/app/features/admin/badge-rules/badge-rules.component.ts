import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { SystemBadge } from '../../../shared/models/dashboard.model';

@Component({
  selector: 'app-badge-rules',
  standalone: false,
  templateUrl: './badge-rules.component.html',
  styleUrls: ['./badge-rules.component.css']
})
export class BadgeRulesComponent implements OnInit {
  badges: SystemBadge[] = [];
  loading = true;

  badgeName = '';
  description = '';
  earningCriteria = '';

  submitting = false;
  message = '';
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadBadges();
  }

  loadBadges(): void {
    this.loading = true;
    this.adminService.getBadges().subscribe({
      next: (data) => {
        this.badges = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  createBadge(): void {
    this.message = '';
    this.error = '';

    if (!this.badgeName.trim() || !this.description.trim() || !this.earningCriteria.trim()) {
      this.error = 'All fields are required to create a new badge.';
      return;
    }

    this.submitting = true;
    this.adminService.createBadge({
      badgeName: this.badgeName.trim(),
      description: this.description.trim(),
      earningCriteria: this.earningCriteria.trim()
    }).subscribe({
      next: (created) => {
        this.submitting = false;
        this.message = `Badge "${created.badgeName}" created successfully!`;
        this.badgeName = '';
        this.description = '';
        this.earningCriteria = '';
        this.loadBadges();
      },
      error: (err) => {
        this.submitting = false;
        this.error = err?.error?.message || 'Failed to create badge. Duplicate names are not allowed.';
      }
    });
  }
}
