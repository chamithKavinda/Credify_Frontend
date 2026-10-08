import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-review',
  standalone: false,
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent {
  productId = '';
  constructor(route: ActivatedRoute) { this.productId = route.snapshot.paramMap.get('productId') || 'sony-wh-1000xm5'; }
  productName = 'Sony WH-1000XM5 Wireless Headphones';
  reviews = [
    { name: 'Elena Rostova', role: 'Top Reviewer', rating: 5, score: 96, date: 'May 12, 2024', title: 'Exceptional ANC with unmatched commuter comfort', text: 'After several months of daily use, the active noise cancellation remains excellent on trains and in the office. Multipoint switching can take a moment, but comfort and battery life have been consistent.', helpful: 148 },
    { name: 'Marcus Chen', role: 'Trusted Contributor', rating: 4, score: 91, date: 'April 29, 2024', title: 'Great isolation, touch controls take practice', text: 'The sound is balanced and the microphone works well in busy cafes. The touch controls sometimes need a second attempt, but the headphones are comfortable for long sessions.', helpful: 41 }
  ];
}