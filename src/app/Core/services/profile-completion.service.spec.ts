import { TestBed } from '@angular/core/testing';

import { ProfileCompletionService } from './profile-completion.service';

describe('ProfileCompletionService', () => {
  let service: ProfileCompletionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileCompletionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
