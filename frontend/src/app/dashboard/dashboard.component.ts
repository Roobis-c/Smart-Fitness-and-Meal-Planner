import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink} from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName = '';
  goal = '';
  age!: number;
  height!: number;
  weight!: number;
  constructor(
    private UserServise:UserService,
  ) {}
  ngOnInit(): void {
    this.loadUser();
  }
  loadUser() {
    this.UserServise.getProfile().subscribe({
      next: (user: any) => {
        this.userName = user.name;
        this.goal = user.goal;
        this.age = user.age;
        this.height = user.height;
        this.weight = user.weight;
      },
      
    });
  }
}