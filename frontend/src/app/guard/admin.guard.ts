import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  canActivate() {
    return this.adminService.getAllUsers().pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(['/admin/login']);
        return of(false);
      })
    );
  }
}
