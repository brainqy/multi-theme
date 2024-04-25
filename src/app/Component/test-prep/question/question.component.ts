// question.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: any;
  @Input() questionIndex!: number; // Initialize questionIndex
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<{ questionIndex: number, option: string, correct: boolean }>();
  selectedOptionIndex: number | null = null; // Initialize selectedOptionIndex

  selectOption(index: number) {
    this.selectedOptionIndex = index;
    const selectedOption = Object.keys(this.question.options[index])[0];
    const isCorrect = selectedOption === this.question.correctAnswer;
    this.optionSelected.emit({ questionIndex: this.questionIndex, option: selectedOption, correct: isCorrect });
  }

  getOptionLetter(option: any): string {
    return Object.keys(option)[0];
  }

  getOptionText(option: any): string {
    return option[Object.keys(option)[0]];
  }
}
