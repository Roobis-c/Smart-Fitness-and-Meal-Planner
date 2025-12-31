import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,MatIconModule,CommonModule,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl:'./profile.component.css'
})

export class ProfileComponent implements OnInit {
  isEditMode=false;

  profile: any = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe(data => {
      this.profile = data;
    });
  }
   toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  updateProfile() {
    this.userService.updateProfile(this.profile)
      .subscribe(() => alert('Profile updated'));
  }
}
