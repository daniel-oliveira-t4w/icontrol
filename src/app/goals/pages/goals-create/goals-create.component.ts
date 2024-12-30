import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';

import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button'
import { LottieComponent } from 'ngx-lottie';

import { GoalModel } from '../../models/goal.model';
import { GoalStepModel } from '../../models/goal-step.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AuthService } from '../../../users/services/auth.service';
import { GoalService } from '../../services/goal.service';
import { AlertStatusMessageComponent } from '../../../shared/components/alert-status-message/alert-status-message.component';


@Component({
  selector: 'app-goals-create',
  standalone: true,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideNativeDateAdapter()
  ],
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatButtonModule, FormsModule, LottieComponent, HeaderComponent, AlertStatusMessageComponent],
  templateUrl: './goals-create.component.html',
  styleUrl: './goals-create.component.css'
})
export class GoalsCreateComponent implements OnInit {
  formGoal!: FormGroup;
  step: string = '';
  stepList: string[] = [];
  created = false;

  router = inject(Router);
  formBuilder = inject(FormBuilder);
  goalService = inject(GoalService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formGoal = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completionDate: [],
    });
  }

  addStep(): void {
    if(!this.step) return;

    this.stepList.push(this.step);
    this.step = '';
  }

  createGoal(): void {
    const request = {
      ...this.formGoal.value,
      userId: this.authService.currentUserSignal()?.id,
      listStep: this.stepList.map(x => {
        return {
          id: crypto.randomUUID(),
          name: x,
          finished : false
        } as GoalStepModel
      })
    } as GoalModel;

    this.goalService.addGoal(request)
      .subscribe({
        next: () => {
          this.created = true;
        },
      })
  }

  goToGoalList(): void {
    this.router.navigateByUrl(`goals`);
  }
}
