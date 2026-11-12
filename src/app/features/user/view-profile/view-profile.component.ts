import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  userId = '';
  profile: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.userService.getPublicProfile(this.userId).subscribe({
        next: (data) => {
          this.profile = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  get initials(): string {
    if (!this.profile) return 'U';
    const first = this.profile.firstName || 'U';
    const last = this.profile.lastName || '';
    return `${first[0]}${last[0] || ''}`.toUpperCase();
  }
}
