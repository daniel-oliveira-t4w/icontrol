import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailExpenseComponent } from './card-detail-expense.component';

describe('CardDetailExpenseComponent', () => {
  let component: CardDetailExpenseComponent;
  let fixture: ComponentFixture<CardDetailExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDetailExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
