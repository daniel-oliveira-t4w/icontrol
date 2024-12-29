import { Routes } from "@angular/router";

import { GoalsListComponent } from "./pages/goals-list/goals-list.component";
import { GoalsCreateComponent } from "./pages/goals-create/goals-create.component";
import { GoalsDetailComponent } from "./pages/goals-detail/goals-detail.component";
import { onlyLoggedGuard } from "../shared/guards/only-logged.guard";

export const GOALS_ROUTES: Routes = [
  { path: '', component: GoalsListComponent, canActivate: [onlyLoggedGuard] },
  { path: 'new', component: GoalsCreateComponent, canActivate: [onlyLoggedGuard] },
  { path: 'detail/:id', component: GoalsDetailComponent, canActivate: [onlyLoggedGuard] },
];
