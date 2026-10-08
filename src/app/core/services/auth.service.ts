import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../../shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;
  private readonly currentUserSubject = new BehaviorSubject<User | null>(this.loadUser());
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  get currentUser(): User | null { return this.currentUserSubject.value; }
  isAuthenticated(): boolean { return !!localStorage.getItem('credifyToken'); }
  isAdmin(): boolean { return this.currentUser?.role === 'ADMIN'; }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(tap(response => this.saveSession(response)));
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request).pipe(tap(response => this.saveSession(response)));
  }

  logout(): void {
    localStorage.removeItem('credifyToken');
    localStorage.removeItem('credifyUser');
    localStorage.removeItem('credifyDemoUser');
    this.currentUserSubject.next(null);
  }

  private saveSession(response: AuthResponse): void {
    localStorage.setItem('credifyToken', response.accessToken);
    localStorage.setItem('credifyUser', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private loadUser(): User | null {
    const value = localStorage.getItem('credifyUser');
    if (!value) return null;
    try { return JSON.parse(value) as User; }
    catch { localStorage.removeItem('credifyUser'); return null; }
  }
}