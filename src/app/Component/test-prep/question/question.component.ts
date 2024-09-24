// question.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: any;
  @Input() questionIndex!: number;
  @Input() selectedOptionIndex!: number | null;  // Receive the selected option index from the parent

  @Output() optionSelected = new EventEmitter<{ questionIndex: number, option: string, correct: boolean }>();

  // Select an option
  selectOption(index: number) {
    this.selectedOptionIndex = index;

    // Get the option letter (e.g., A, B, C)
    const selectedOption = this.getOptionLetter(this.question.options[index]);
    const isCorrect = selectedOption === this.question.correctAnswer;

    // Emit the selected option letter (not the index)
    this.optionSelected.emit({ questionIndex: this.questionIndex, option: selectedOption, correct: isCorrect });
  }

  // Get the option letter (e.g., A, B, C)
  getOptionLetter(option: any): string {
    return Object.keys(option)[0];
  }

  // Get the option text (e.g., the actual option value)
  getOptionText(option: any): string {
    return option[Object.keys(option)[0]];
  }}
