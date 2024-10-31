import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQueComponent } from './select-que.component';

describe('SelectQueComponent', () => {
  let component: SelectQueComponent;
  let fixture: ComponentFixture<SelectQueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectQueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectQueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
