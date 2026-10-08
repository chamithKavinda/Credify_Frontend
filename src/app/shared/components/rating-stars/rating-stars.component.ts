import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: false,
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent {
  @Input() rating = 0;
  @Input() max = 5;
  @Input() readOnly = true;
  @Output() ratingChange = new EventEmitter<number>();

  get stars(): number[] { return Array.from({ length: this.max }, (_, index) => index + 1); }
  setRating(value: number): void {
    if (!this.readOnly) {
      this.rating = value;
      this.ratingChange.emit(value);
    }
  }
}