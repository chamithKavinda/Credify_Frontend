import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Comment, CreateReviewRequest, Report, Review } from '../../shared/models/review.model';

export interface ListReviewsFilter {
  q?: string;
  category?: string;
  minRating?: number;
  sort?: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly url = `${environment.apiBaseUrl}/reviews`;

  constructor(private http: HttpClient) {}

  listReviews(filter: ListReviewsFilter = {}): Observable<Review[]> {
    let params = new HttpParams();
    if (filter.q) params = params.set('q', filter.q);
    if (filter.category) params = params.set('category', filter.category);
    if (filter.minRating) params = params.set('minRating', filter.minRating);
    if (filter.sort) params = params.set('sort', filter.sort);

    return this.http.get<Review[]>(this.url, { params });
  }

  getReview(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.url}/${encodeURIComponent(id)}`);
  }

  create(request: CreateReviewRequest): Observable<Review> {
    return this.http.post<Review>(this.url, request);
  }

  update(id: string, request: Partial<CreateReviewRequest>): Observable<Review> {
    return this.http.put<Review>(`${this.url}/${encodeURIComponent(id)}`, request);
  }

  getComments(reviewId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}/${encodeURIComponent(reviewId)}/comments`);
  }

  addComment(reviewId: string, commentText: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.url}/${encodeURIComponent(reviewId)}/comments`, { commentText });
  }

  markHelpful(reviewId: string): Observable<{ helpfulVoteCount: number }> {
    return this.http.post<{ helpfulVoteCount: number }>(`${this.url}/${encodeURIComponent(reviewId)}/helpful`, {});
  }

  reportReview(reviewId: string, reason: string): Observable<Report> {
    return this.http.post<Report>(`${this.url}/${encodeURIComponent(reviewId)}/reports`, { reason });
  }
}