import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminDashboardSummary, SystemBadge } from '../../shared/models/dashboard.model';
import { Report, Review } from '../../shared/models/review.model';
import { User } from '../../shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly url = `${environment.apiBaseUrl}/admin`;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<AdminDashboardSummary> {
    return this.http.get<AdminDashboardSummary>(`${this.url}/dashboard`);
  }

  getReviewQueue(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.url}/reviews`);
  }

  moderateReview(reviewId: string, decision: 'PUBLISHED' | 'HIDDEN' | 'REMOVED'): Observable<Review> {
    const params = new HttpParams().set('decision', decision);
    return this.http.patch<Review>(`${this.url}/reviews/${encodeURIComponent(reviewId)}`, {}, { params });
  }

  getReports(status: 'OPEN' | 'REVIEWED' | 'DISMISSED' = 'OPEN'): Observable<Report[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<Report[]>(`${this.url}/reports`, { params });
  }

  resolveReport(reportId: string, decision: 'REVIEWED' | 'DISMISSED'): Observable<Report> {
    const params = new HttpParams().set('decision', decision);
    return this.http.patch<Report>(`${this.url}/reports/${encodeURIComponent(reportId)}`, {}, { params });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  updateUserStatus(userId: string, status: 'ACTIVE' | 'SUSPENDED'): Observable<User> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<User>(`${this.url}/users/${encodeURIComponent(userId)}/status`, {}, { params });
  }

  getBadges(): Observable<SystemBadge[]> {
    return this.http.get<SystemBadge[]>(`${this.url}/badges`);
  }

  createBadge(badge: { badgeName: string; description: string; earningCriteria: string }): Observable<SystemBadge> {
    return this.http.post<SystemBadge>(`${this.url}/badges`, badge);
  }

  awardBadge(userId: string, badgeId: string): Observable<any> {
    return this.http.post<any>(`${this.url}/users/${encodeURIComponent(userId)}/badges/${encodeURIComponent(badgeId)}`, {});
  }
}