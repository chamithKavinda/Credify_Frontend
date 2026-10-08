import { Component } from '@angular/core';
@Component({ selector: 'app-platform-settings', standalone: false, templateUrl: './platform-settings.component.html', styleUrls: ['./platform-settings.component.css'] })
export class PlatformSettingsComponent {
  burstThreshold = 10;
  timeWindow = 120;
  duplicateThreshold = 85;
  requireHumanReview = true;
  saveMessage = '';
  save(): void { this.saveMessage = 'Platform settings saved for this local demo.'; setTimeout(() => this.saveMessage = '', 2500); }
}