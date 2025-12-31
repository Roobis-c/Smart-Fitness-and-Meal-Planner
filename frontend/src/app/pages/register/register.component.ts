import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink,MatIconModule],
  templateUrl: './register.component.html',
  styleUrl:'./register.component.css'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword='';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

onRegister() {
  if (this.password !== this.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  this.auth.register({
    name: this.name,
    email: this.email,
    password: this.password
  }).subscribe({
    next: () => {
      alert('Registration completed');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      if (err.status === 409) {
        alert('Email already registered , Login');
      } else {
        alert('Registration failed. Try again.');
      }
    }
  });
}

}
