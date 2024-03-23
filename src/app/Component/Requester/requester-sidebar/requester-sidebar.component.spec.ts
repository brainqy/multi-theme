import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequesterSidebarComponent } from './requester-sidebar.component';

describe('RequesterSidebarComponent', () => {
  let component: RequesterSidebarComponent;
  let fixture: ComponentFixture<RequesterSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequesterSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequesterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
