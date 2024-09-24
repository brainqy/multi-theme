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
  @Input() selectedOptionIndex: number | null = null; // Currently selected option index
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<{ questionIndex: number; option: string; correct: boolean }>();

  selectOption(index: number) {
    this.selectedOptionIndex = index; // Update the selected option index
    const selectedOption = this.getOptionLetter(this.question.options[index]);
    const isCorrect = selectedOption === this.question.correctAnswer; // Check if selected option is correct
    this.optionSelected.emit({ questionIndex: this.questionIndex, option: selectedOption, correct: isCorrect });
  }

  getOptionLetter(option: any): string {
    return Object.keys(option)[0]; // Get the letter of the option (A, B, C, etc.)
  }

  getOptionText(option: any): string {
    return option[this.getOptionLetter(option)]; // Get the text of the option
  }

}