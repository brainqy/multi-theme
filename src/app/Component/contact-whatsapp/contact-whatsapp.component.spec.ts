import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactWhatsappComponent } from './contact-whatsapp.component';

describe('ContactWhatsappComponent', () => {
  let component: ContactWhatsappComponent;
  let fixture: ComponentFixture<ContactWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactWhatsappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
