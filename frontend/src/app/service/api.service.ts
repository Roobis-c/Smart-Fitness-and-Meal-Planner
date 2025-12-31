import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private BASE_URL = 'http://localhost:5001/api';

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}${url}`, {
      withCredentials: true
    });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.BASE_URL}${url}`, body, {
      withCredentials: true
    });
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}${url}`, body, {
      withCredentials: true
    });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.BASE_URL}${url}`, {
      withCredentials: true
    });
  }
}
