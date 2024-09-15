import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbadgesComponent } from './addbadges.component';

describe('AddbadgesComponent', () => {
  let component: AddbadgesComponent;
  let fixture: ComponentFixture<AddbadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbadgesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
