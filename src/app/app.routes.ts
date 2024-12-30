import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'goals'
  },
  {
    path: 'goals',
    loadChildren: () => import('./goals/goals.routes').then(r => r.GOALS_ROUTES)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes').then(r => r.USERS_ROUTES)
  },
  {
    path: 'finances',
    loadChildren: () => import('./finances/finances.routes').then(r => r.FINANCES_ROUTES)
  },
  {
    path: 'configs',
    loadChildren: () => import('./configs/configs.routes').then(r => r.CONFIGS_ROUTES)
  }
];
