import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { ExpenseModel } from '../../models/expense.model';
import { ConvertToDatePipe } from '../../../shared/pipes/convert-to-date.pipe';


@Component({
  selector: 'app-card-expense',
  standalone: true,
  imports: [MatIconModule, ConvertToDatePipe, DatePipe, CurrencyPipe],
  templateUrl: './card-expense.component.html',
  styleUrl: './card-expense.component.css'
})
export class CardExpenseComponent {
  @Input() expense!: ExpenseModel;
}
