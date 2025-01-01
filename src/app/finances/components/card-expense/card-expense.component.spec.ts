import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExpenseComponent } from './card-expense.component';

describe('CardExpenseComponent', () => {
  let component: CardExpenseComponent;
  let fixture: ComponentFixture<CardExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
