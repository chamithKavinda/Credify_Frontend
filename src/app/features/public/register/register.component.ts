import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register', standalone: false,
  templateUrl: './register.component.html', styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName = '';
  handle = '';
  email = '';
  password = '';
  specialty = 'Consumer Tech';
  accepted = false;
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register(): void {
    this.error = '';
    if (!this.accepted) { this.error = 'Please accept the Contributor Integrity Charter.'; return; }
    this.loading = true;
    this.auth.register({
      fullName: this.fullName.trim(), handle: this.handle.trim(), email: this.email.trim(),
      password: this.password, specialty: this.specialty
    }).subscribe({
      next: () => this.router.navigate(['/user/dashboard']),
      error: () => { this.error = 'Registration failed. Check the details or try another email.'; this.loading = false; }
    });
  }
}