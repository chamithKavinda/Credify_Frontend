import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateReviewRequest, Review } from '../../shared/models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly url = `${environment.apiBaseUrl}/reviews`;
  constructor(private http: HttpClient) {}

  create(request: CreateReviewRequest): Observable<Review> {
    return this.http.post<Review>(this.url, request);
  }

  getMine(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.url}/mine`);
  }

  markHelpful(reviewId: string): Observable<{ helpfulCount: number }> {
    return this.http.post<{ helpfulCount: number }>(`${this.url}/${encodeURIComponent(reviewId)}/helpful`, {});
  }
}