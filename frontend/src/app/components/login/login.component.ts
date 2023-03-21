import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error = "";

  constructor(private authService: AuthService,
      private snack: MatSnackBar,
      private fb: FormBuilder,
      private router: Router) {}

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  login() {
    if (!this.loginForm.valid) return

    const userData = this.loginForm.value

    this.authService.login(userData).subscribe({
      next: userInfo => {
        this.authService.setUserInfo(userInfo)
        this.router.navigate(['/dashboard'])
      },
      error: err => {
        this.snack.open('Login Failed', 'Dismiss', { duration: 2000 })
      }
    })
  }
}
