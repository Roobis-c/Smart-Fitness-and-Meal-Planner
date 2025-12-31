import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule,MatIconModule,RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  email = '';
  password = '';

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  login() {
    this.adminService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: () => alert('Invalid admin credentials')
    });
  }
}
