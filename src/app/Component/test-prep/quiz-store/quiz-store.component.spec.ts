import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStoreComponent } from './quiz-store.component';

describe('QuizStoreComponent', () => {
  let component: QuizStoreComponent;
  let fixture: ComponentFixture<QuizStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
