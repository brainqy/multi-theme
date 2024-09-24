import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizService } from 'src/app/Core/services/quiz.service';

@Component({
  selector: 'app-quiz-player',
  templateUrl: './quiz-player.component.html',
  styleUrls: ['./quiz-player.component.scss']
})
export class QuizPlayerComponent implements OnInit{
  sideNavStatus!:false;
  questions: any[] = [
    { questionId:1,
      question: 'What is 2 + 2?', 
      options: [{A: '1'}, {B: '2'}, {C: '3'}, {D: '4'}], 
      correctAnswer: 'D'
    },
    { questionId:2,
      question: 'What is the capital of France?', 
      options: [{A: 'Paris'}, {B: 'London'}, {C: 'Rome'}, {D: 'Berlin'}], 
      correctAnswer: 'A'
    },
    { questionId:3,
      question: 'What is the powerhouse of the cell?', 
      options: [{A: 'Nucleus'}, {B: 'Mitochondria'}, {C: 'Ribosome'}, {D: 'Endoplasmic reticulum'}], 
      correctAnswer: 'B'
    },
    // Add more questions here
    { questionId:4,
      question: 'What is the chemical symbol for water?', 
      options: [{A: 'H2O'}, {B: 'CO2'}, {C: 'NaCl'}, {D: 'O2'}], 
      correctAnswer: 'A'
    },
    { questionId:5,
      question: 'Who wrote "To Kill a Mockingbird"?', 
      options: [{A: 'Harper Lee'}, {B: 'J.K. Rowling'}, {C: 'Stephen King'}, {D: 'Ernest Hemingway'}], 
      correctAnswer: 'A'
    }
    // Add more questions here
  ];
  allQuestionAnswers:any;
  allQ: any;
constructor(private quizService:QuizService){

}
  ngOnInit(): void {
    this.getAllQuestions();
  }
  selectedOptions: ([number, string] | null)[] = Array(this.questions.length).fill(null);
  currentQuestionIndex = 0;
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

  handleOptionSelected(event: { questionIndex: number, option: string, correct: boolean }) {
    const questionIndex = event.questionIndex;
    const optionIndex = this.getOptionIndex(event.option); // Get option index

    // Store the selected option as a tuple [index, optionLetter]
    this.selectedOptions[questionIndex] = [optionIndex, event.option];

    console.log(`Question ${questionIndex + 1}: Selected option letter ${event.option}`);
  }




  // Get the selected option index for current question
  getSelectedOptionIndex(): number | null {
    const selected = this.selectedOptions[this.currentQuestionIndex];
    return selected ? selected[0] : null; // Return the option index or null
  }

 


  // Check if all questions have been answered



  private getOptionIndex(option: string): number {
    const question = this.questions[this.currentQuestionIndex];
    return question.options.findIndex((opt: any) => this.getOptionLetter(opt) === option);
  }

  private getOptionLetter(option: any): string {
    return Object.keys(option)[0];
  }

  // Check if all questions have been answered
  allQuestionsAnswered(): boolean {
    return Object.keys(this.selectedOptions).length === this.questions.length;
  }


/*   logQuestionOptions() {
    console.log("Selected options for each question:");
    this.questions.forEach((question, index) => {
      const selectedOptionIndex = this.selectedOptions[index];
      const selectedOption = selectedOptionIndex !== null ? this.getOptionLetter(question.options[selectedOptionIndex]) : 'Not selected';
      console.log(`Question ${index + 1}: Option ${selectedOption}`);
    });
  } */

  submitQuiz() {
    //this.logQuestionOptions();
  }

  getAllQuestions(){
this.quizService.getQuestions().subscribe((data)=>{
  this.allQ=data;
console.log(" this.allQ ", this.allQ);

})
  }
}
