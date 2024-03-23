import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TmHeaderComponent} from './tm-header.component';

describe('TmHeaderComponent', () => {
  let component: TmHeaderComponent;
  let fixture: ComponentFixture<TmHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmHeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
