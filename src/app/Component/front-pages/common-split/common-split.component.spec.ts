import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSplitComponent } from './common-split.component';

describe('CommonSplitComponent', () => {
  let component: CommonSplitComponent;
  let fixture: ComponentFixture<CommonSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSplitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
