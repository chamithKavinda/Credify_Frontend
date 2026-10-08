import { Component } from '@angular/core';
@Component({ selector: 'app-reports', standalone: false, templateUrl: './reports.component.html', styleUrls: ['./reports.component.css'] })
export class ReportsComponent {
  period = 'Last 7 days';
  exportMessage = '';
  exportReport(): void { this.exportMessage = 'Demo report prepared. Connect the reports API to download real data.'; }
}