import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsCreateComponent } from './goals-create.component';

describe('GoalsCreateComponent', () => {
  let component: GoalsCreateComponent;
  let fixture: ComponentFixture<GoalsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
