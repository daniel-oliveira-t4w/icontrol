import { inject, Injectable } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Observable } from 'rxjs';
import { ExpenseModel } from '../models/expense.model';
import { AuthService } from '../../users/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  firebaseService = inject(FirebaseService);
  authService = inject(AuthService);

  getExpenses(month: string, year: number): Observable<ExpenseModel[]> {
    const filters = [
      { field: 'userId', operator: '==', value: this.authService.currentUserSignal()?.id },
      { field: 'month', operator: '==', value: month },
      { field: 'year', operator: '==', value: year }
    ];

    return this.firebaseService.getByFilter<ExpenseModel[]>('expense', filters);
  }

  addExpense(request: ExpenseModel) {
    request.userId = this.authService.currentUserSignal()?.id!;
    return this.firebaseService.add<ExpenseModel>('expense', request);
  }

  updateExpenseStatus(payed: boolean, id: string) {
    return this.firebaseService.update<ExpenseModel>('expense', id, { payed: payed } as ExpenseModel);
  }

  deleteExpense(id: string): Observable<void> {
    return this.firebaseService.delete<ExpenseModel>('expense', id);
  }
}
