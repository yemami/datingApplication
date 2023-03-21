import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  signupForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
    },
    {
      validators: this.passwordMatch,
    }
  );

  passwordMatch(c: AbstractControl): ValidationErrors | null {
    if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  get name() {
    return this.signupForm.get('name');
  }

  get gender() {
    return this.signupForm.get('gender');
  }
  get dateOfBirth() {
    return this.signupForm.get('dateOfBirth');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  signup() {
    if (this.signupForm?.errors?.['mismatch']) {
      this.snack.open("Password doesn't match", 'Dismiss', { duration: 2000 });
      return;
    }

    if (!this.signupForm.valid) return;

    const userData: any = this.signupForm.value;
    this.authService.signup(userData).subscribe({
      next: (userInfo) => {
        console.log("signup successful", userInfo)
        this.snack.open('Signup successful', 'Dismiss', { duration: 2000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snack.open('Signup failed', 'Dismiss', { duration: 6000 });
      },
    });
  }
}
