import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterHomeComponent } from './requester-home.component';

describe('RequesterHomeComponent', () => {
  let component: RequesterHomeComponent;
  let fixture: ComponentFixture<RequesterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequesterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
