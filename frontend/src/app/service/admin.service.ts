  import { Injectable } from '@angular/core';
  import { ApiService } from './api.service';

  @Injectable({ providedIn: 'root' })
  export class AdminService {

    constructor(private api: ApiService) {}

    login(data: any) {
      return this.api.post('/admin/login', data);
    }

    getAllUsers() {
      return this.api.get('/admin/users');
    }
  addUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return this.api.post('/admin/users', data);
  }

    getUser(id: number) {
      return this.api.get(`/admin/users/${id}`);
    }
updateUser(userId: number, data: any) {
  return this.api.put('/admin/users/profile', {userId,...data});
}

    updateUserPlan(id: number, plan: any) {
      return this.api.put(`/admin/users/${id}/plan`, plan);
    }
    deleteUser(id: number) {
  return this.api.delete(`/admin/users/${id}`);
}

  }
