import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LottieComponent } from 'ngx-lottie';


import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LottieComponent, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userLoginForm!: FormGroup;
  showPassword = false;
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.userLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    const { email, password } = this.userLoginForm.value
    this.authService.login(email, password)
      .subscribe({
        next: () => this.navigateToGoals(),
        error: err => this.snackBar.open(`Falha ao realizar o login: ${err.code}`, '', { duration: 3000})
      })
  }

  navigateToGoals(): void {
    this.router.navigateByUrl('goals');
  }

}
