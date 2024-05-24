
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-job-tracker',
  templateUrl: './job-tracker.component.html',
  styleUrls: ['./job-tracker.component.scss']
})
export class JobTrackerComponent {
  
  title = 'angular-drag-drop-tutorial';
  saved = [{"jobRole":"","jobLocation":""}];
  applied = [{"jobRole":"","jobLocation":""}];
  interview = [ {"jobRole":"","jobLocation":""}];
  offer = [{"jobRole":"","jobLocation":""}];
jobs=[{"jobRole":"Full Stack","jobLocation":"Pune"},{"jobRole":"Java Backend","jobLocation":"Pune"},{"jobRole":"Java Backend","jobLocation":"Pune"},{"jobRole":"Java Backend","jobLocation":"Banglore"},{"jobRole":"Java Backend","jobLocation":"Mumbai"},{"jobRole":"Java Backend","jobLocation":"Hyderabad"}];

drop(event: CdkDragDrop<{ jobRole: string; jobLocation: string; }[]>) {
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

}
