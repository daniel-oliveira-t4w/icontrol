import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { map, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const onlyLoggedGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const _snackBar = inject(MatSnackBar);

  return user(auth).pipe(
    take(1),
    map((currentUser) => {
      if (currentUser) {
        return true;
      }

      _snackBar.open('Usuário não está logado', '', {
        duration: 3000
      });
      return router.createUrlTree(['users/login']);
    })
  );
};
