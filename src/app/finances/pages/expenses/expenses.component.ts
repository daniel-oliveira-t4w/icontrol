import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FinanceService } from '../../services/finance.service';
import { ExpenseModel } from '../../models/expense.model';
import { CardExpenseComponent } from '../../components/card-expense/card-expense.component';
import { CardDetailExpenseComponent } from '../../components/card-detail-expense/card-detail-expense.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [HeaderComponent, MatSelectModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, FormsModule, MatListModule, MatIconModule, AsyncPipe, CurrencyPipe, MatButtonModule, CardExpenseComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  months!: string[];
  monthSelected!: string;
  years!: number[];
  yearSelected!: number;
  expenses$!: Observable<ExpenseModel[]>;
  totalExpenses = 0;

  financeService = inject(FinanceService);
  router = inject(Router);
  bottomSheet = inject(MatBottomSheet);

  ngOnInit(): void {
    this.initializeVariables();

    setTimeout(() => {
      this.getExpense();
    }, 1000);
  }

  initializeVariables(): void {
    this.months = Array.from({ length: 12 }, (_, i) =>
      new Date(2000, i).toLocaleString('pt-BR', { month: 'long' })
    );
    this.monthSelected = this.months[new Date().getMonth()];

    this.yearSelected = new Date().getFullYear();
    this.years = Array.from({ length: 5 }, (_, i) => (this.yearSelected - 2) + i);
  }

  getExpense(): void {
    this.expenses$ = this.financeService
      .getExpenses(this.monthSelected, this.yearSelected)
      .pipe(
        tap(x => this.calculeTotalExpenses(x))
      );
  }

  addExpense(): void {
    this.router.navigateByUrl('finances/expense/new');
  }

  openExpenseDetail(expense: ExpenseModel): void {
    this.bottomSheet.open(CardDetailExpenseComponent, {
      data: {
        expense,
        close: () => this.getExpense()
      }
    });
  }

  calculeTotalExpenses(expenses: ExpenseModel[]): void {
    this.totalExpenses = 0;

    if (!expenses) return;

    expenses.forEach(expense => {
      this.totalExpenses += expense.value;
    });
  }
}
