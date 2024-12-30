import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatRippleModule} from '@angular/material/core';


import { GoalModel } from '../../models/goal.model';

@Component({
  selector: 'app-card-goal',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatChipsModule, MatRippleModule],
  templateUrl: './card-goal.component.html',
  styleUrl: './card-goal.component.css'
})
export class CardGoalComponent implements OnInit {
  @Input() goal!: GoalModel;
  @Output() navigateTo = new EventEmitter();

  class = '';

  ngOnInit(): void {
    this.class = this.goal.finished ? 'card-status-finished' : 'card-status-not-finished'
  }


}
