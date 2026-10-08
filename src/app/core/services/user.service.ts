import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/auth.model';
import { UserDashboardSummary } from '../../shared/models/dashboard.model';
import { Review } from '../../shared/models/review.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly url = `${environment.apiBaseUrl}/users`;
  constructor(private http: HttpClient) {}

  getMe(): Observable<User> { return this.http.get<User>(`${this.url}/me`); }
  getPublicProfile(userId: string): Observable<User> { return this.http.get<User>(`${this.url}/${encodeURIComponent(userId)}/public`); }
  getDashboard(): Observable<UserDashboardSummary> { return this.http.get<UserDashboardSummary>(`${this.url}/me/dashboard`); }
  getMyReviews(): Observable<Review[]> { return this.http.get<Review[]>(`${this.url}/me/reviews`); }
  updateMe(data: Partial<User>): Observable<User> { return this.http.patch<User>(`${this.url}/me`, data); }
}