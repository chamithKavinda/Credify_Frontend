import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class UserSettingsComponent {
  displayName = 'Elena Rostova';
  email = localStorage.getItem('credifyDemoUser') || 'elena@example.com';
  publicProfile = true;
  productAlerts = true;
  reviewUpdates = true;
  securityAlerts = true;
  saved = false;

  save(): void {
    this.saved = true;
    setTimeout(() => this.saved = false, 2500);
  }
}