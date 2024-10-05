// question.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: any;
  @Input() questionIndex!: number; // Current question index
  @Input() sectionIndex!: number;
  @Input() selectedOptionIndex: number | null = null; // Currently selected option index
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  //@Output() optionSelected = new EventEmitter<{ questionIndex: number; option: string; correct: boolean }>();
  @Output() optionSelected = new EventEmitter<{ sectionIndex: number; questionIndex: number; option: string; correct: boolean }>();
  correctAnswer!: string;

  selectOption(option: string) {
    this.optionSelected.emit({
      sectionIndex: this.sectionIndex, // Assuming sectionIndex is passed to this component
      questionIndex: this.questionIndex,
      option: option,
      correct: option === this.correctAnswer // Compare with the correct answer
    });
  }

  getOptionLetter(option: any): string {
    return Object.keys(option)[0]; // Get the letter of the option (A, B, C, etc.)
  }

  getOptionText(option: any): string {
    return option[this.getOptionLetter(option)]; // Get the text of the option
  }

}