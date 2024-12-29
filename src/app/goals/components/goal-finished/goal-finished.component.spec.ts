import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalFinishedComponent } from './goal-finished.component';

describe('GoalFinishedComponent', () => {
  let component: GoalFinishedComponent;
  let fixture: ComponentFixture<GoalFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalFinishedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
