import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/auth.model';
import { UserDashboardSummary } from '../../shared/models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly url = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<UserDashboardSummary> {
    return this.http.get<UserDashboardSummary>(`${this.url}/me/dashboard`);
  }

  getMyProfile(): Observable<User & { badges: any[] }> {
    return this.http.get<User & { badges: any[] }>(`${this.url}/me/profile`);
  }

  updateProfile(data: { firstName: string; lastName: string }): Observable<User> {
    return this.http.put<User>(`${this.url}/me/profile`, data);
  }

  getPublicProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${encodeURIComponent(userId)}`);
  }
}