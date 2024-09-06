import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTwoStepsComponent } from './auth-two-steps.component';

describe('AuthTwoStepsComponent', () => {
  let component: AuthTwoStepsComponent;
  let fixture: ComponentFixture<AuthTwoStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthTwoStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTwoStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
