import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatSlideToggleModule
} from '@angular/material/slide-toggle';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FinanceService } from '../../services/finance.service';
import { AuthService } from '../../../users/services/auth.service';
import { ExpenseModel } from '../../models/expense.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expenses-create',
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, HeaderComponent, MatSelectModule, MatDatepickerModule, MatSlideToggleModule],
  templateUrl: './expenses-create.component.html',
  styleUrl: './expenses-create.component.css'
})
export class ExpensesCreateComponent implements OnInit {
  expenseForm!: FormGroup;

  router = inject(Router);
  formBuilder = inject(FormBuilder);
  financeService = inject(FinanceService);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.expenseForm = this.formBuilder.group({
      name: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0.1)]],
      date: [new Date(), Validators.required],
      category: ['more_horiz', Validators.required],
      payed: [false, Validators.required],
    });
  }

  createExpense(): void {
    const { date } = this.expenseForm.value;
    const request = {
      ...this.expenseForm.value,
      month: date.toLocaleString('pt-BR', { month: 'long' }),
      year: date.getFullYear()
    } as ExpenseModel;

    this.financeService.addExpense(request)
      .subscribe({
        next: () => {
          this.snackBar.open('Despesa gerada com sucesso!', '', { duration: 3000 })
          this.goToExpenseList();
        }
      })
  }

  goToExpenseList(): void {
    this.router.navigateByUrl(`finances`);
  }
}
