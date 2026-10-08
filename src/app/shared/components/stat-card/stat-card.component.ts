import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: false,
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() detail = '';
  @Input() icon = '✦';
  @Input() tone: 'purple' | 'teal' | 'red' = 'purple';
}