import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminDashboardSummary, BadgeRule } from '../../shared/models/dashboard.model';
import { ModerationDecision, Review } from '../../shared/models/review.model';
import { User } from '../../shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly url = `${environment.apiBaseUrl}/admin`;
  constructor(private http: HttpClient) {}

  getDashboard(): Observable<AdminDashboardSummary> { return this.http.get<AdminDashboardSummary>(`${this.url}/dashboard`); }
  getReviewQueue(): Observable<Review[]> { return this.http.get<Review[]>(`${this.url}/reviews/queue`); }
  decideReview(reviewId: string, decision: ModerationDecision): Observable<Review> {
    return this.http.patch<Review>(`${this.url}/reviews/${encodeURIComponent(reviewId)}/decision`, decision);
  }
  getUsers(): Observable<User[]> { return this.http.get<User[]>(`${this.url}/users`); }
  updateUserStatus(userId: string, status: 'ACTIVE' | 'SUSPENDED' | 'PROBATION'): Observable<User> {
    return this.http.patch<User>(`${this.url}/users/${encodeURIComponent(userId)}/status`, { status });
  }
  getBadgeRules(): Observable<BadgeRule[]> { return this.http.get<BadgeRule[]>(`${this.url}/badge-rules`); }
  updateBadgeRules(rules: BadgeRule[]): Observable<BadgeRule[]> { return this.http.put<BadgeRule[]>(`${this.url}/badge-rules`, rules); }
  getReports(period: string): Observable<unknown> { return this.http.get(`${this.url}/reports`, { params: { period } }); }
  updateSettings(settings: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.patch<Record<string, unknown>>(`${this.url}/settings`, settings);
  }
}