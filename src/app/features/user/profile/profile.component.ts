import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  role = '';
  reputationScore = 0;
  badges: any[] = [];

  loading = true;
  saving = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe({
      next: (data) => {
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.role = data.role || 'USER';
        this.reputationScore = data.reputationScore || 0;
        this.badges = data.badges || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get initials(): string {
    return `${(this.firstName || 'U')[0]}${(this.lastName || '')[0] || ''}`.toUpperCase();
  }

  saveProfile(): void {
    this.successMsg = '';
    this.errorMsg = '';
    if (!this.firstName.trim() || !this.lastName.trim()) {
      this.errorMsg = 'First Name and Last Name are required.';
      return;
    }

    this.saving = true;
    this.userService.updateProfile({
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim()
    }).subscribe({
      next: (updatedUser) => {
        this.saving = false;
        this.successMsg = 'Profile details updated successfully!';
        const current = this.auth.currentUser;
        if (current) {
          current.firstName = updatedUser.firstName;
          current.lastName = updatedUser.lastName;
          localStorage.setItem('credifyUser', JSON.stringify(current));
        }
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = err?.error?.message || 'Failed to update profile.';
      }
    });
  }
}
