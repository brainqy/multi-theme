import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnHomeComponent } from './mn-home.component';

describe('MnHomeComponent', () => {
  let component: MnHomeComponent;
  let fixture: ComponentFixture<MnHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MnHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
