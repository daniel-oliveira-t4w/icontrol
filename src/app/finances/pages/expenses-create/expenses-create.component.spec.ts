import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesCreateComponent } from './expenses-create.component';

describe('ExpensesCreateComponent', () => {
  let component: ExpensesCreateComponent;
  let fixture: ComponentFixture<ExpensesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
