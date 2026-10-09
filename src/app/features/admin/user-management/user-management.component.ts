import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { User } from '../../../shared/models/auth.model';
import { SystemBadge } from '../../../shared/models/dashboard.model';

@Component({
  selector: 'app-user-management',
  standalone: false,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  badges: SystemBadge[] = [];
  loading = true;
  message = '';
  selectedBadgeId = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.adminService.getBadges().subscribe({
      next: (data) => {
        this.badges = data;
        if (data.length > 0) this.selectedBadgeId = data[0].id;
      }
    });
  }

  loadUsers(): void {
    this.loading = true;
    this.adminService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  toggleStatus(user: User): void {
    const newStatus = user.accountStatus === 'SUSPENDED' ? 'ACTIVE' : 'SUSPENDED';
    this.message = '';
    this.adminService.updateUserStatus(user.id, newStatus).subscribe({
      next: () => {
        user.accountStatus = newStatus;
        this.message = `Updated ${user.firstName} ${user.lastName} status to ${newStatus}.`;
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to update user status.');
      }
    });
  }

  awardBadge(userId: string): void {
    if (!this.selectedBadgeId) return;
    this.adminService.awardBadge(userId, this.selectedBadgeId).subscribe({
      next: () => {
        this.message = `Badge awarded successfully to user!`;
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to award badge.');
      }
    });
  }
}