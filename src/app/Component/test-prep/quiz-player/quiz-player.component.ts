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
  currentQuestionIndex = 0;
  selectedOptions: (number | null)[] = []; 

  correctness: boolean[] = Array(this.questions.length).fill(false);
  quizSubmitted = false;

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

  handleOptionSelected(event: { questionIndex: number; option: string; correct: boolean }) {
    const questionIndex = event.questionIndex; // Get the current question index
    this.selectedOptions[questionIndex] = this.getOptionIndex(event.option); // Store only the index of the selected option
    console.log(`Question ${questionIndex + 1}: Option ${event.option}`);
  }

   getOptionIndex(option: string): number {
    const question = this.questions[this.currentQuestionIndex]; // Get current question
    return question.options.findIndex((opt: any) => this.getOptionLetter(opt) === option); // Find index of the selected option
  }

   getOptionLetter(option: any): string {
    if (!option || typeof option !== 'object') {
      return ''; // Return an empty string or handle the case as needed
    }
    const keys = Object.keys(option);
    return keys.length > 0 ? keys[0] : ''; // Return the first key or an empty string
  }
  


  isSelectedOption(questionIndex: number, optionLetter: string): boolean {
    const selected = this.selectedOptions[questionIndex]; // This should be of type number | null
    return selected !== null && this.getOptionLetter(this.questions[questionIndex].options[selected]) === optionLetter;
}

isCorrectOption(questionIndex: number, optionLetter: string): boolean {
    return this.questions[questionIndex].correctAnswer === optionLetter; // Assuming optionLetter is a string like 'A', 'B', etc.
}


  getAllQuestions(){
this.quizService.getQuestions().subscribe((data)=>{
  this.allQ=data;
console.log(" this.allQ ", this.allQ);

})
  }
  allQuestionsAnswered(): boolean {
    return this.selectedOptions.length === this.questions.length && 
           this.selectedOptions.every(option => option !== null);
  }

  // Submit the quiz
  submitQuiz(): void {
    const results = this.selectedOptions.map((selectedOption, index) => {
      const question = this.questions[index];
      const selectedLetter = selectedOption !== null ? this.getOptionLetter(question.options[selectedOption]) : null;
      const isCorrect = selectedLetter === question.correctAnswer;
      return {
        question: question.question,
        selectedAnswer: selectedLetter,
        isCorrect,
      };
    });
    this.quizSubmitted=true;
    console.log("Quiz Results: ", results);
    // Here, you can handle what to do with the results, such as displaying them or sending them to a server.
  }

}
