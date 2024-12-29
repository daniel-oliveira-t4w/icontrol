import { Component, inject, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LottieComponent } from 'ngx-lottie';

import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AuthService } from '../../../users/services/auth.service';
import { GoalService } from '../../services/goal.service';
import { GoalModel } from '../../models/goal.model';


@Component({
  selector: 'app-goals-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, AsyncPipe, LottieComponent, HeaderComponent],
  templateUrl: './goals-list.component.html',
  styleUrl: './goals-list.component.css'
})
export class GoalsListComponent implements OnInit {
  goals$!: Observable<GoalModel[]>;
  goalsNoRegistered = false;

  router = inject(Router);
  goalService = inject(GoalService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.goals$ = this.goalService.getGoals()
      .pipe(
        tap(x => {
          this.goalsNoRegistered = x.length === 0;
          console.log(x)
        })
      );
  }

  goToGoalDetail(id: string): void {
    this.router.navigateByUrl(`goals/detail/${id}`);
  }

  goToGoalCreate(): void {
    this.router.navigateByUrl(`goals/new`);
  }

}
