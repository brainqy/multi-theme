import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterHeaderComponent } from './requester-header.component';

describe('RequesterHeaderComponent', () => {
  let component: RequesterHeaderComponent;
  let fixture: ComponentFixture<RequesterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequesterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
