import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { ApiService } from '../../service/api.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIcon,RouterLink],
  templateUrl: './admin-add-user.component.html',
  styleUrl: './admin-add-user.component.css'
})
export class AdminAddUserComponent {
  basicUser = {
    name: '',
    email: '',
    password: ''
  };
  profile = {
    userId: 0,
    name: '',
    age: null,
    gender: '',
    height: null,
    weight: null,
    goal: 'weight_loss'
  };

  constructor(
    private adminService: AdminService,
    private api: ApiService,
    private router: Router
  ) {}

  createUser() {
  if (
    !this.basicUser.name ||
    !this.basicUser.email ||
    !this.basicUser.password
  ) {
    alert('Please fill all basic user details');
    return;
  }

  this.adminService.addUser(this.basicUser).subscribe({
    next: (res: any) => {
      alert('User created. Now fill profile details');
      this.profile.userId = res.userId;
      this.profile.name = this.basicUser.name;
    },
    error: (err) => {
      if (err.status === 409) {
        alert('Email already exists');
      } else if (err.status === 401) {
        alert('Unauthorized admin');
      } else {
        alert('Failed to create user');
      }
    }
  });
}


  saveProfile() {
    this.api.put('/auth/profile', this.profile).subscribe({
      next: () => {
        alert('Profile saved & plans generated');
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => alert('Profile update failed')
    });
  }
}
