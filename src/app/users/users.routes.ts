import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

export const USERS_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create', component: RegisterComponent }
];
