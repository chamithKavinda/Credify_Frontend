export interface User {
    id: string;
    fullName: string;
    handle: string;
    email: string;
    role: 'USER' | 'ADMIN';
    reputationScore?: number;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    fullName: string;
    handle: string;
    email: string;
    password: string;
    specialty: string;
  }
  
  export interface AuthResponse {
    accessToken: string;
    user: User;
  }