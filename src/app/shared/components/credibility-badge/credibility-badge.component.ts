import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credibility-badge',
  standalone: false,
  templateUrl: './credibility-badge.component.html',
  styleUrls: ['./credibility-badge.component.css']
})
export class CredibilityBadgeComponent {
  @Input() score = 0;
  @Input() showLabel = true;

  get level(): string {
    if (this.score >= 85) return 'High credibility';
    if (this.score >= 60) return 'Moderate credibility';
    return 'Elevated risk';
  }
  get tone(): string {
    if (this.score >= 85) return 'high';
    if (this.score >= 60) return 'medium';
    return 'low';
  }
}