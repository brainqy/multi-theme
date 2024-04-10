import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeWithFrndsComponent } from './practice-with-frnds.component';

describe('PracticeWithFrndsComponent', () => {
  let component: PracticeWithFrndsComponent;
  let fixture: ComponentFixture<PracticeWithFrndsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeWithFrndsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeWithFrndsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
