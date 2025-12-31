import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../service/user.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink} from '@angular/router';


@Component({
  selector: 'app-learn-fit',
  standalone:true,
  imports:[CommonModule,MatIconModule,RouterLink],
  templateUrl: './learn-fit.component.html',
  styleUrls: ['./learn-fit.component.css']
})
export class LearnFitnessComponent implements OnInit {

userName = '';
  goal = '';

  age!: number;
  height!: number;
  weight!: number;


  constructor(private UserServise:UserService) {}

  ngOnInit() {
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
