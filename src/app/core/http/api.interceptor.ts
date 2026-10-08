import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('credifyToken');
  const requestWithAuth = token
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;

  return next(requestWithAuth);
};