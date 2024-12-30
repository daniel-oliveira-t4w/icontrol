import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundMessageGoalFinishedComponent } from './background-message-goal-finished.component';

describe('BackgroundMessageGoalFinishedComponent', () => {
  let component: BackgroundMessageGoalFinishedComponent;
  let fixture: ComponentFixture<BackgroundMessageGoalFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundMessageGoalFinishedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundMessageGoalFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
