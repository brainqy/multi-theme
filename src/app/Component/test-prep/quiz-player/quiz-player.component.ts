import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-player',
  templateUrl: './quiz-player.component.html',
  styleUrls: ['./quiz-player.component.scss']
})
export class QuizPlayerComponent {
  currentQuestionIndex = 0;
  questions: any[] = [
    { 
      question: 'What is 2 + 2?', 
      options: [{A: '1'}, {B: '2'}, {C: '3'}, {D: '4'}], 
      correctAnswer: 'D'
    },
    { 
      question: 'What is the capital of France?', 
      options: [{A: 'Paris'}, {B: 'London'}, {C: 'Rome'}, {D: 'Berlin'}], 
      correctAnswer: 'A'
    },
    { 
      question: 'What is the powerhouse of the cell?', 
      options: [{A: 'Nucleus'}, {B: 'Mitochondria'}, {C: 'Ribosome'}, {D: 'Endoplasmic reticulum'}], 
      correctAnswer: 'B'
    },
    // Add more questions here
    { 
      question: 'What is the chemical symbol for water?', 
      options: [{A: 'H2O'}, {B: 'CO2'}, {C: 'NaCl'}, {D: 'O2'}], 
      correctAnswer: 'A'
    },
    { 
      question: 'Who wrote "To Kill a Mockingbird"?', 
      options: [{A: 'Harper Lee'}, {B: 'J.K. Rowling'}, {C: 'Stephen King'}, {D: 'Ernest Hemingway'}], 
      correctAnswer: 'A'
    }
    // Add more questions here
  ];
  selectedOptions: (number | null)[] = Array(this.questions.length).fill(null); // Initialize selectedOptions array
  moveToPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  moveToNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }
// In your component class


  handleOptionSelected(event: { option: string, correct: boolean }) {
    console.log('Selected Option:', event.option);
    console.log('Is Correct?', event.correct ? 'Yes' : 'No');
  }

}
