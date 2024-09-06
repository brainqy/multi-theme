import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeScanHistoryComponent } from './resume-scan-history.component';

describe('ResumeScanHistoryComponent', () => {
  let component: ResumeScanHistoryComponent;
  let fixture: ComponentFixture<ResumeScanHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeScanHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeScanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
