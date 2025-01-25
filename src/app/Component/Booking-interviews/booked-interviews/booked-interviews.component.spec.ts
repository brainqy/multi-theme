import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedInterviewsComponent } from './booked-interviews.component';

describe('BookedInterviewsComponent', () => {
  let component: BookedInterviewsComponent;
  let fixture: ComponentFixture<BookedInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedInterviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
