
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-job-tracker',
  templateUrl: './job-tracker.component.html',
  styleUrls: ['./job-tracker.component.scss']
})
export class JobTrackerComponent {
  //8830142847
  title = 'angular-drag-drop-tutorial';
  saved = [{"jobRole":"","jobLocation":"","company":""}];
  applied = [{"jobRole":"","jobLocation":"","company":""}];
  interview = [ {"jobRole":"","jobLocation":"","company":""}];
  offer = [{"jobRole":"","jobLocation":"","company":""}];
jobs=[{"jobRole":"Full Stack","jobLocation":"Pune","company":"Siemens"},{"jobRole":"Java Backend","jobLocation":"Pune","company":"Cummins"},{"jobRole":"Java Backend","jobLocation":"Pune","company":"Mahindra"},{"jobRole":"Java Backend","jobLocation":"Banglore","company":"Wipro"},{"jobRole":"Java Backend","jobLocation":"Mumbai","company":"Cognizant"},{"jobRole":"Java Backend","jobLocation":"Hyderabad","company":"Infosys"}];
constructor(private modalService: NgbModal) {}

drop(event: CdkDragDrop<{ jobRole: string; jobLocation: string;company:string }[]>) {
  if (event.previousContainer === event.container) {
    // Reorder items within the same list
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    // Move items between lists
    const droppedItem = event.previousContainer.data[event.previousIndex];
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
openModal() {
  const modalRef = this.modalService.open(ModalComponent);
  modalRef.result.then((result) => {
    console.log(result); // Handle modal close result
  }, (reason) => {
    console.log(reason); // Handle modal dismiss reason
  });
}
}
