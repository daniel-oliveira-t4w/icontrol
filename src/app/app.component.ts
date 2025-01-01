import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { BottomNavigationComponent } from './shared/components/bottom-navigation/bottom-navigation.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

import { AuthService } from './users/services/auth.service';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BottomNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideNativeDateAdapter()
  ]
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);

  title = 'icontrol';

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSignal.set({
          email: user.email!,
          name: user.displayName!,
          id: user.uid
        });
      } else {
        this.authService.currentUserSignal.set(null);
      }
    })
  }

}
