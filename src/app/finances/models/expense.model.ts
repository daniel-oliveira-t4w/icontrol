export interface ExpenseModel {
  id: string;
  userId: string;
  month: string;
  year: number;
  name: string;
  value: number;
  category: string;
  date: Date;
  payed: boolean;
}
