import { TestBed } from '@angular/core/testing';

import { JobScanService } from './job-scan.service';

describe('JobScanService', () => {
  let service: JobScanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobScanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
