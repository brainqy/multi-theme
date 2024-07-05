import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-whatsapp',
  templateUrl: './contact-whatsapp.component.html',
  styleUrls: ['./contact-whatsapp.component.scss']
})
export class ContactWhatsappComponent {
  showForm: boolean = false;

  toggleFormVisibility(event: Event) {
    event.preventDefault(); // Prevents the default behavior of the anchor tag
    this.showForm = !this.showForm;
  }

  sendMessage(event: Event) {
    event.preventDefault(); // Prevents the default form submission
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';

    const messageText = `Name: ${encodeURIComponent(name)}%0AMessage: ${encodeURIComponent(message)}%0APhone: ${encodeURIComponent(email)}`;

    // Replace with your WhatsApp number and message
    const whatsappUrl = `https://wa.me/+919561402263?text=${messageText}`;

    // Open the WhatsApp URL in a new tab
    window.open(whatsappUrl, '_blank');

    // Optionally, you can reset the form after submission
    // this.showForm = false;
  }


}
