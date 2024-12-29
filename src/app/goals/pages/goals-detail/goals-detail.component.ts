import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


import { GoalModel } from '../../models/goal.model';
import { AllStepWereFinishedPipe } from '../../pipes/all-step-were-finished.pipe';
import { DialogConfirmActionComponent } from '../../../shared/components/dialog-confirm-action/dialog-confirm-action.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { GoalService } from '../../services/goal.service';
import { GoalFinishedComponent } from '../../components/goal-finished/goal-finished.component';

@Component({
  selector: 'app-goals-detail',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, MatCheckboxModule, FormsModule, MatButtonModule, MatMenuModule, AllStepWereFinishedPipe, HeaderComponent, GoalFinishedComponent],
  templateUrl: './goals-detail.component.html',
  styleUrl: './goals-detail.component.css'
})
export class GoalsDetailComponent implements OnInit {
  goal!: GoalModel | null;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  goalService = inject(GoalService);
  readonly dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id)
      return this.goToGoalList();

    this.getGoal(id);
  }

  getGoal(id: string): void {
    this.goalService.getGoalById(id)
      .subscribe({
        next: (x) => this.goal = x
      });
  }

  deleteGoal(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmActionComponent, {
      data: { title: 'Exluir Meta', text: 'Deseja realmente excluir a meta?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goalService.deleteGoal(id)
          .subscribe({
            next: () => {
              this._snackBar.open('Meta excluída com sucesso', ':)', {
                duration: 3000
              });
              this.goToGoalList();
            }
          });
      }
    });
  }



  updateStep(): void {
    this.goalService.updateListStepGoal(this.goal!.listStep, this.goal!.id)
      .subscribe({
        next: () => console.log('Atualizando')
      })
  }

  finishGoal(): void {
    const dialogRef = this.dialog.open(DialogConfirmActionComponent, {
      data: { title: 'Finalizar Meta', text: 'Parabéns por concluir a meta! Deseja confirmar alteração?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goalService.finishGoal(this.goal!.id)
          .subscribe({
            next: () => this._snackBar.open('Meta finalizada com sucesso!', '', { duration: 3000 })
          });
      }
    });
  }

  goToGoalList(): void {
    this.router.navigateByUrl(`goals`);
  }
}
