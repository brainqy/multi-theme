import { TestBed } from '@angular/core/testing';

import { InterviewBuddyService } from './interview-buddy.service';

describe('InterviewBuddyService', () => {
  let service: InterviewBuddyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewBuddyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
