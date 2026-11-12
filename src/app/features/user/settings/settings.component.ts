import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  displayName = '';
  email = '';
  publicProfile = true;
  productAlerts = true;
  reviewUpdates = true;
  securityAlerts = true;
  saved = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (user) {
      this.displayName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      this.email = user.email || '';
    } else {
      this.displayName = 'Contributor';
      this.email = 'contributor@example.com';
    }
  }

  save(): void {
    this.saved = true;
    setTimeout(() => this.saved = false, 2500);
  }
}
