import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  accepted = false;
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register(): void {
    this.error = '';
    if (!this.accepted) {
      this.error = 'Please accept the Contributor Integrity Charter.';
      return;
    }
    if (!this.firstName.trim() || !this.lastName.trim() || !this.email.trim() || !this.password) {
      this.error = 'All fields are required.';
      return;
    }
    if (this.password.length < 8) {
      this.error = 'Password must be at least 8 characters long.';
      return;
    }

    this.loading = true;
    this.auth.register({
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      password: this.password
    }).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.user.role === 'ADMIN') {
          this.router.navigate(['/admin/reviews']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Registration failed. Check your details or try another email.';
      }
    });
  }

  closeModal(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']);
  }
}