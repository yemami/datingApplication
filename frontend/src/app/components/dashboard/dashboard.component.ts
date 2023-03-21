import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from './IUser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  users: IUser[] = [];

  onLike(user: any) {
    console.log('Liked!');
    this.users = this.users.filter((u) => u._id !== user._id);
    this.authService.likeUser(user).subscribe((response: any) => {
      console.log(response);
    });
  }

  onDislike(user: any) {
    console.log('Disliked!');
    this.users = this.users.filter((u) => u._id !== user._id);
  }
  constructor(private authService: AuthService) {
    this.authService.getSuggestedMatches().subscribe((response: any) => {
      this.users = response.data as IUser[];
    });
  }
  get fullName() {
    return this.authService.getName();
  }
}
