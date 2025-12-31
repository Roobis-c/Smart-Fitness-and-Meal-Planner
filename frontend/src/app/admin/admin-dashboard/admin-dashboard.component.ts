import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  users: any[] = [];
  loading = false;
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.loading = true;
    this.adminService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Failed to load users');
      }
    });
  }
  deleteUser(id: number): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete this user? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    this.adminService.deleteUser(id).subscribe({
      next: () => {
        alert('User deleted successfully');
        this.users = this.users.filter(u => u.id !== id);
      },
      error: () => {
        alert('Failed to delete user');
      }
    });
  }
  openUser(id: number): void {
    this.router.navigate(['/admin/user', id]);
  }
  addUser(): void {
    this.router.navigate(['/admin/add-user']);
  }
}
