import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private api: ApiService) {}

  register(data: any) {
    return this.api.post('/auth/register', data);
  }

  login(data: any) {
    return this.api.post('/auth/login', data);
  }

  getMe() {
    return this.api.get('/auth/me');
  }

  logout() {
    return this.api.post('/auth/logout', {});
  }
}
