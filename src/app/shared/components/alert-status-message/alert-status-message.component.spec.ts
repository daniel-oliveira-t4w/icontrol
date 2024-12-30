import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertStatusMessageComponent } from './alert-status-message.component';

describe('AlertStatusMessageComponent', () => {
  let component: AlertStatusMessageComponent;
  let fixture: ComponentFixture<AlertStatusMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertStatusMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertStatusMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
