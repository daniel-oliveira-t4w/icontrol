import { inject, Injectable, signal } from '@angular/core';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user,  } from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';
import { from, tap } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuthService = inject(Auth);
  user$ = user(this.firebaseAuthService);
  currentUserSignal = signal<UserModel | null | undefined>(undefined);

  registerUser(email: string, name: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.firebaseAuthService, email, password)
        .then(x => updateProfile(x.user, { displayName: name }))
    );
  }

  login(email: string, password: string) {
    return from(
      signInWithEmailAndPassword(this.firebaseAuthService, email, password)
        .then(x => {
          if(x.user)
            this.currentUserSignal.set({
              email: x.user.email!,
              name: x.user.displayName ?? '',
              id: x.user.uid
            });
          return true;
        })
    );
  }

  logout() {
    return from(
      signOut(this.firebaseAuthService)
    );
  }
}
