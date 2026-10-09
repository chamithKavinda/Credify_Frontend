import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Report } from '../../../shared/models/review.model';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  statusFilter: 'OPEN' | 'REVIEWED' | 'DISMISSED' = 'OPEN';
  reports: Report[] = [];
  loading = true;
  message = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;
    this.adminService.getReports(this.statusFilter).subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  resolve(reportId: string, decision: 'REVIEWED' | 'DISMISSED'): void {
    this.message = '';
    this.adminService.resolveReport(reportId, decision).subscribe({
      next: () => {
        this.message = `Report updated to ${decision}.`;
        this.loadReports();
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to update report status.');
      }
    });
  }
}