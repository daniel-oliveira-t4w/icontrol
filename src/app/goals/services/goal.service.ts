import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FirebaseService } from '../../shared/services/firebase.service';
import { AuthService } from '../../users/services/auth.service';
import { GoalStepModel } from '../models/goal-step.model';
import { GoalModel } from './../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  firebaseService = inject(FirebaseService);
  authService = inject(AuthService);

  getGoals(): Observable<GoalModel[]> {
    return this.firebaseService.getByFilter<GoalModel[]>('goal', [{field: 'userId', operator: '==', value: this.authService.currentUserSignal()?.id}]);
  }

  addGoal(request: GoalModel): Observable<string> {
    return this.firebaseService.add<GoalModel>('goal', request);
  }

  deleteGoal(id: string): Observable<void> {
    return this.firebaseService.delete<GoalModel>('goal', id);
  }

  getGoalById(id: string): Observable<GoalModel | null> {
    return this.firebaseService.getById<GoalModel>('goal', id);
  }

  updateListStepGoal(listStep: GoalStepModel[], id: string) {
    return this.firebaseService.update<GoalModel>('goal', id, { listStep: listStep } as GoalModel );
  }

  finishGoal(id: string) {
    return this.firebaseService.update<GoalModel>('goal', id, { finished: true } as GoalModel );
  }
}
