import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsDetailComponent } from './goals-detail.component';

describe('GoalsDetailComponent', () => {
  let component: GoalsDetailComponent;
  let fixture: ComponentFixture<GoalsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
