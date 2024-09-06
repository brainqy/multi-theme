import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeRLaunchingComponent } from './we-r-launching.component';

describe('WeRLaunchingComponent', () => {
  let component: WeRLaunchingComponent;
  let fixture: ComponentFixture<WeRLaunchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeRLaunchingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeRLaunchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
