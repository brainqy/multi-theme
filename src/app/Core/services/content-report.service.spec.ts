import { TestBed } from '@angular/core/testing';

import { ContentReportService } from './content-report.service';

describe('ContentReportService', () => {
  let service: ContentReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
