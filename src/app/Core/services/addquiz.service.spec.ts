import { TestBed } from '@angular/core/testing';

import { AddquizService } from './addquiz.service';

describe('AddquizService', () => {
  let service: AddquizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddquizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
