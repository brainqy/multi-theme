import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnHeaderComponent } from './mn-header.component';

describe('MnHeaderComponent', () => {
  let component: MnHeaderComponent;
  let fixture: ComponentFixture<MnHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
