import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onlyLoggedGuard } from './only-logged.guard';

describe('onlyLoggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onlyLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
