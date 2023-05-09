import {TestBed} from '@angular/core/testing';

import {CanOpenLoginGuard} from './can-open-login-guard.service';

describe('CanLoginGuard', () => {
  let guard: CanOpenLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanOpenLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
