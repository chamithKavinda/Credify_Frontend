import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductSearchParams } from '../../shared/models/product.model';
import { Review } from '../../shared/models/review.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly url = `${environment.apiBaseUrl}/products`;
  constructor(private http: HttpClient) {}

  search(filters: ProductSearchParams = {}): Observable<Product[]> {
    let params = new HttpParams();
    if (filters.query) params = params.set('query', filters.query);
    if (filters.category) params = params.set('category', filters.category);
    if (filters.minCredibility !== undefined) params = params.set('minCredibility', filters.minCredibility);
    if (filters.minRating !== undefined) params = params.set('minRating', filters.minRating);
    if (filters.page !== undefined) params = params.set('page', filters.page);
    if (filters.size !== undefined) params = params.set('size', filters.size);
    return this.http.get<Product[]>(this.url, { params });
  }

  getById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${encodeURIComponent(productId)}`);
  }

  getReviews(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.url}/${encodeURIComponent(productId)}/reviews`);
  }
}