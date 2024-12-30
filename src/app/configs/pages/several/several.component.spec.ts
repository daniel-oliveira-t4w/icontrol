import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeveralComponent } from './several.component';

describe('SeveralComponent', () => {
  let component: SeveralComponent;
  let fixture: ComponentFixture<SeveralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeveralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeveralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
