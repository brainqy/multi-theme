import { TestBed } from '@angular/core/testing';

import { MnGuard } from './mn.guard';

describe('MnGuard', () => {
  let guard: MnGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MnGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
