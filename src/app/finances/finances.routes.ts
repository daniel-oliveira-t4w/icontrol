import { Routes } from "@angular/router";
import { ExpensesComponent } from "./pages/expenses/expenses.component";
import { ExpensesCreateComponent } from "./pages/expenses-create/expenses-create.component";

export const FINANCES_ROUTES: Routes = [
  { path: '', component: ExpensesComponent },
  { path: 'expense/new', component: ExpensesCreateComponent },
];
