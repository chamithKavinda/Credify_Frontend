import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sign-in', standalone: false,
  templateUrl: './sign-in.component.html', styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email = '';
  password = '';
  remember = true;
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  signIn(): void {
    this.error = '';
    this.loading = true;
    this.auth.login({ email: this.email.trim(), password: this.password }).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/user/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => { this.error = 'Sign in failed. Check your email and password.'; this.loading = false; }
    });
  }
}