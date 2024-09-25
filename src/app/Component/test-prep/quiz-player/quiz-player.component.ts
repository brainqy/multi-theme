import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizService } from 'src/app/Core/services/quiz.service';

@Component({
  selector: 'app-quiz-player',
  templateUrl: './quiz-player.component.html',
  styleUrls: ['./quiz-player.component.scss']
})
export class QuizPlayerComponent implements OnInit{
  sideNavStatus!:false;
  correctCount = 0;
  wrongCount = 0;
  unattemptedCount = 0;
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
  this.resetTimeTracking();
}
  ngOnInit(): void {
    this.getAllQuestions();
  }
  currentQuestionIndex = 0;
  selectedOptions: (number | null)[] = []; 

  correctness: boolean[] = Array(this.questions.length).fill(false);
  quizSubmitted = false;
// Time tracking
questionStartTime: number[] = []; // Store start time for each question
timeTakenPerQuestion: number[] = []; // Store time taken for each question in seconds

  moveToPreviousQuestion() {
    this.recordTimeForCurrentQuestion();
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
    this.startTimerForCurrentQuestion();
  }

  moveToNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
    this.startTimerForCurrentQuestion(); // Start timer for new question
  }

  handleOptionSelected(event: { questionIndex: number; option: string; correct: boolean }) {
    const questionIndex = event.questionIndex; // Get the current question index
    this.selectedOptions[questionIndex] = this.getOptionIndex(event.option); // Store only the index of the selected option
    console.log(`Question ${questionIndex + 1}: Option ${event.option}`);
    this.startTimerForCurrentQuestion(); // Restart timer after selection
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
    this.quizSubmitted = true;
    this.recordTimeForCurrentQuestion();
    // Reset counts
    this.correctCount = 0;
    this.wrongCount = 0;
    this.unattemptedCount = 0;

    // Calculate correct, wrong, and unattempted questions
    this.questions.forEach((question, index) => {
      const selectedOptionIndex = this.selectedOptions[index];
      if (selectedOptionIndex === null || selectedOptionIndex === undefined) {
        this.unattemptedCount++;
      } else {
        const selectedOptionLetter = this.getOptionLetter(question.options[selectedOptionIndex]);
        if (selectedOptionLetter === question.correctAnswer) {
          this.correctCount++;
        } else {
          this.wrongCount++;
        }
      }
    });
    console.log("Quiz Submitted. Correct: ", this.correctCount, "Wrong: ", this.wrongCount, "Unattempted: ", this.unattemptedCount);
    console.log("Time taken per question (in seconds): ", this.timeTakenPerQuestion);
      }
  resetTimeTracking(): void {
    this.questionStartTime = new Array(this.questions.length).fill(0); // Track the start time of each question
    this.timeTakenPerQuestion = new Array(this.questions.length).fill(0); // Track the time taken for each question
  }
// Start the timer for the current question
startTimerForCurrentQuestion(): void {
  this.questionStartTime[this.currentQuestionIndex] = Date.now();
}

// Record the time spent on the current question
recordTimeForCurrentQuestion(): void {
  const startTime = this.questionStartTime[this.currentQuestionIndex];
  const timeSpent = (Date.now() - startTime) / 1000; // Time spent in seconds
  this.timeTakenPerQuestion[this.currentQuestionIndex] += timeSpent;
}


}
