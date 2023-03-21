import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private authService: AuthService, private router: Router){}

  get userLoggedIn() {
    return this.authService.isLoggedIn()
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['', 'login'])
  }

  get onHomePage() {
    return this.router.isActive('', true)
  }
}
