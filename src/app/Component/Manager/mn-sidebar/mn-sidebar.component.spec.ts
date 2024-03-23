import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnSidebarComponent } from './mn-sidebar.component';

describe('MnSidebarComponent', () => {
  let component: MnSidebarComponent;
  let fixture: ComponentFixture<MnSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MnSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
