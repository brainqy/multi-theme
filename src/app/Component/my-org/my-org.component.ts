import { Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AiBotService } from 'src/app/Core/services/ai-bot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-org',
  templateUrl: './my-org.component.html',
  styleUrls: ['./my-org.component.css']
})
export class MyOrgComponent {
  response!: string;
  prompt!: string;
  newOrgForm!: NgForm;
  ngOnInit(): void {
    // Initialize the form structure using FormBuilder
    this.formBuilder.group({
      orgName: ['', Validators.required], // Create a FormControl for orgName with initial value and validators
      orgUsername: ['', Validators.required], // Create a FormControl for orgUsername with initial value and validators
    });
  }

  chat(prompt: string): void {
    this.customBotService.chat(prompt).subscribe((response: string) => {
      this.response = response;
    });
  }
  constructor(private formBuilder :FormBuilder, private modalService: NgbModal,private customBotService: AiBotService) {} // Inject NgbModal service

  openOrgModal(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  addNewOrganization(newOrgForm:NgForm) {
    if (newOrgForm.valid) {
      this.customBotService.createOrg(newOrgForm.value).subscribe((res)=>{
console.log("custom bot service in ts ",res)
Swal.fire('Info',"Event Created Successfully",'success');
      })
      this.modalService.dismissAll();
      // Form is valid, you can submit the data to your backend or perform any other action
      console.log(newOrgForm.value); // Access form values
      // Example: Call a service to save the organization data
      // this.organizationService.saveOrganization(newOrgForm.value).subscribe(response => {
      //   console.log('Organization added successfully', response);
      // });
    } else {
      // Form is invalid, handle validation errors if needed
      console.log('Form is invalid');
      // You can display validation errors to the user if necessary
    }
  }

}
