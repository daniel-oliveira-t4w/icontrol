import { Pipe, PipeTransform } from '@angular/core';
import { GoalStepModel } from '../models/goal-step.model';

@Pipe({
  name: 'allStepWereFinished',
  standalone: true,
  pure: false
})
export class AllStepWereFinishedPipe implements PipeTransform {

  transform(value: GoalStepModel[]): boolean {
    if (!value || value?.length === 0) return true;

    return !value.some(x => !x.finished);
  }

}
