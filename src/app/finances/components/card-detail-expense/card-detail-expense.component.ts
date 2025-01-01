import { FinanceService } from './../../services/finance.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ExpenseModel } from '../../models/expense.model';
import { ConvertToDatePipe } from '../../../shared/pipes/convert-to-date.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmActionComponent } from '../../../shared/components/dialog-confirm-action/dialog-confirm-action.component';

@Component({
  selector: 'app-card-detail-expense',
  standalone: true,
  imports: [DatePipe, ConvertToDatePipe, CurrencyPipe, CommonModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './card-detail-expense.component.html',
  styleUrl: './card-detail-expense.component.css'
})
export class CardDetailExpenseComponent implements OnInit {

  data = inject(MAT_BOTTOM_SHEET_DATA) as any;
  financeService = inject(FinanceService);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);
  bottomSheetRef = inject<MatBottomSheetRef<CardDetailExpenseComponent>>(MatBottomSheetRef);

  ngOnInit(): void {
  }

  updateExpenseStatus(event: MatSlideToggleChange): void {
    this.financeService.updateExpenseStatus(event.checked, this.data.expense.id)
      .subscribe({
        next: () => {
          this.snackBar.open('Atualizado com sucesso!', '', { duration: 3000 });
          this.data.close();
          this.bottomSheetRef.dismiss();
        },
        error: err => this.snackBar.open(`Erro ao atualizar: ${err.message}`, '', { duration: 3000 })
      });
  }

  deleteExpense(): void {
    const dialogRef = this.dialog.open(DialogConfirmActionComponent, {
      data: { title: 'Exluir Despesa', text: 'Deseja realmente excluir a despesa?' },
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.financeService.deleteExpense(this.data.expense.id)
            .subscribe({
              next: () => {
                this.snackBar.open('Excluído com sucesso!', '', { duration: 3000 })
                this.data.close();
                this.bottomSheetRef.dismiss();
              },
              error: err => this.snackBar.open(`Erro ao excluir despesa: ${err.message}`, '', { duration: 3000 })
            });
        }
      });
  }
}
