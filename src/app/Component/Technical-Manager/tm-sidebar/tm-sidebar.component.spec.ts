import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TmSidebarComponent} from './tm-sidebar.component';

describe('TmSidebarComponent', () => {
  let component: TmSidebarComponent;
  let fixture: ComponentFixture<TmSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmSidebarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TmSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
