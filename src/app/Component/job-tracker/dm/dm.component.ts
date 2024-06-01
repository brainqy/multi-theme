import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Job, JobService } from 'src/app/Core/services/job.service';

@Component({
  selector: 'app-dm',
  templateUrl: './dm.component.html',
  styleUrls: ['./dm.component.scss']
})
export class DmComponent {
  @Input() attribute!: { name: string, value: string, newField1: string, newField2: string };
  @Input() job!: Job ;
  constructor(public activeModal: NgbActiveModal) { }

  close() {
    this.activeModal.dismiss();
  }

  save() {
    this.activeModal.close(this.attribute);
  }
}
