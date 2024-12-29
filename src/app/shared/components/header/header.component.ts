import { Component, inject, Input } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';

import { AuthService } from '../../../users/services/auth.service';
import { Router } from '@angular/router';
import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatRippleModule, LottieComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() useDefaultHeader = false;

  authService = inject(AuthService);
  router = inject(Router);


  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => this.router.navigateByUrl('users/login')
      })
  }

}
