import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private api: ApiService) {}

  getProfile() {
    return this.api.get('/auth/me');
  }

  updateProfile(data: {
    name: string;
    age: number;
    gender: string;
    height: number;
    weight: number;
    goal: string;
  }) {
    return this.api.put('/auth/profile', data);
  }
}
