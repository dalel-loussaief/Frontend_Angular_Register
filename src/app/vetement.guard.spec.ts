import { TestBed } from '@angular/core/testing';

import { VetementGuard } from './vetement.guard';

describe('VetementGuard', () => {
  let guard: VetementGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VetementGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
