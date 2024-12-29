import { Component, inject, OnInit } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar';
import { LottieComponent } from 'ngx-lottie';

import { matchPasswordValidator } from '../../validators/password-match.validator';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LottieComponent, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  showPassword = false;
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, matchPasswordValidator('password')]],
    });
  }

  registerUser(): void {
    const {name, email, password, confirmPassword} = this.userForm.value

    if(confirmPassword !== password){
      this.snackBar.open(`Senhas não são iguais`, '', { duration: 3000})
      return;
    }

    this.authService.registerUser(email, name, password)
      .subscribe({
        next: () => this.navigateToLogin(),
        error: err => this.snackBar.open(`Falha ao criar usuário: ${err.message}`, '', { duration: 4000})
      })
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('users/login');
  }
}
