import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserDashboardSummary } from '../../../shared/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  summary: UserDashboardSummary | null = null;
  loading = true;

  constructor(
    private userService: UserService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getDashboard().subscribe({
      next: (data) => {
        this.summary = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
