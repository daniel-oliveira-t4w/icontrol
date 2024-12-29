import { GoalStepModel } from "./goal-step.model";

export interface GoalModel {
  id: string;
  title: string;
  description: string;
  listStep: GoalStepModel[];
  finished: boolean;
  completionDate: Date;
  userId: string;
}
