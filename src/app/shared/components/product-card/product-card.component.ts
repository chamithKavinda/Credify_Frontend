import { Component, Input } from '@angular/core';

export interface CredifyProductCardData {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  credibilityScore: number;
  reviewCount: string | number;
  icon?: string;
}

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: CredifyProductCardData = {
    id: '', name: '', category: '', description: '', rating: 0,
    credibilityScore: 0, reviewCount: 0, icon: '✦'
  };
}