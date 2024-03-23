import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewMatcherComponent } from './interview-matcher.component';

describe('InterviewMatcherComponent', () => {
  let component: InterviewMatcherComponent;
  let fixture: ComponentFixture<InterviewMatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewMatcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
