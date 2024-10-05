import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizService } from 'src/app/Core/services/quiz.service';
interface Section {
  section: string;
  questions: Question[];
  correctAnswersCount: number; // Add this line
  wrongAnswersCount: number; // Add this line
  unattemptedCount: number; // Add this line
}
interface Question{
  
}

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

  sections = [
    {
      section: 'Mathematics',
      questions: [
        {
          questionId: 1,
          question: 'What is 2 + 2?',
          options: [{ A: '1' }, { B: '2' }, { C: '3' }, { D: '4' }],
          correctAnswer: 'D'
        },
        {
          questionId: 2,
          question: 'What is 7 + 2?',
          options: [{ A: '1' }, { B: '9' }, { C: '3' }, { D: '4' }],
          correctAnswer: 'B'
        },
        {
          questionId: 3,
          question: 'What is 7 + 7?',
          options: [{ A: '1' }, { B: '14' }, { C: '3' }, { D: '4' }],
          correctAnswer: 'B'
        }
        // Add more math-related questions here
      ], correctAnswersCount: 0, // Initialize count
      wrongAnswersCount: 0,   // Initialize count
      unattemptedCount: 0 ,    //
    },
    {
      section: 'Geography',
      questions: [
        {
          questionId: 7,
          question: 'What is the capital of France?',
          options: [{ A: 'Paris' }, { B: 'London' }, { C: 'Rome' }, { D: 'Berlin' }],
          correctAnswer: 'A'
        },
        {
          questionId: 8,
          question: 'What is the capital of India?',
          options: [{ A: 'Delhi' }, { B: 'London' }, { C: 'Rome' }, { D: 'Mumbai' }],
          correctAnswer: 'A'
        }
        // Add more geography-related questions here
      ],
      correctAnswersCount: 0, // Initialize count
      wrongAnswersCount: 0,   // Initialize count
      unattemptedCount: 0 ,    //
    }
    // Add more sections here
  ];

  currentQuestionIndex = 0;
  currentSectionIndex = 0;
  
  selectedOptions: (number | null)[][] = []; // Array of arrays to hold selected options for each section
  quizSubmitted = false;

  questionStartTime: number[] = []; // Store start time for each question
  timeTakenPerQuestion: number[] = []; // Store time taken for each question in seconds

  constructor(private quizService: QuizService) {
    this.resetTimeTracking();
  }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  get currentSectionQuestions() {
    return this.sections[this.currentSectionIndex]?.questions || [];
  }

  moveToPreviousQuestion() {
    this.recordTimeForCurrentQuestion();
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    } else if (this.currentSectionIndex > 0) {
      // Move to the last question of the previous section
      this.currentSectionIndex--;
      this.currentQuestionIndex = this.sections[this.currentSectionIndex].questions.length - 1;
    }
    this.startTimerForCurrentQuestion();
  }

  moveToNextQuestion() {
    this.recordTimeForCurrentQuestion();
    if (this.currentQuestionIndex < this.currentSectionQuestions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      console.log("move to another section");
      
      this.moveToNextSection();
    }
    this.startTimerForCurrentQuestion(); // Start timer for new question
  }
  moveToNextSection() {
    this.recordTimeForCurrentQuestion(); // Record time for the current question
    if (this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++; // Move to the next section
      this.currentQuestionIndex = 0; // Reset to the first question in the new section
      this.resetTimeTracking(); // Reset the timing for the new section
    } else {
      // Handle the end of the quiz (e.g., submit quiz or show results)
      this.submitQuiz(); // Example: Automatically submit when all sections are done
    }
  }
  
  handleOptionSelected(event: { sectionIndex: number; questionIndex: number; option: string; correct: boolean }) {
    const sectionIndex = event.sectionIndex;
    const questionIndex = event.questionIndex;
    const optionLabel = Object.keys(event.option)[0];
    // Ensure that selectedOptions is initialized for the section
    if (!this.selectedOptions[sectionIndex]) {
      this.selectedOptions[sectionIndex] = [];
    }
    // Store only the index of the selected option for the specific section and question
    this.selectedOptions[sectionIndex][questionIndex] = this.getOptionIndex(optionLabel);
    console.log(`Section ${sectionIndex + 1}, Question ${questionIndex + 1}: Option ${optionLabel}`);
    // Restart timer after selection
    this.startTimerForCurrentQuestion();
}

  

  getOptionIndex(option: string): number {
    const question = this.currentSectionQuestions[this.currentQuestionIndex]; // Get current question
    return question.options.findIndex((opt: any) => this.getOptionLetter(opt) === option); // Find index of the selected option
  }

  getOptionLetter(option: any): string {
    if (!option || typeof option !== 'object') {
      return ''; // Return an empty string or handle the case as needed
    }
    const keys = Object.keys(option);
    return keys.length > 0 ? keys[0] : ''; // Return the first key or an empty string
  }

  isSelectedOption(sectionIndex: number, questionIndex: number, optionLetter: string): boolean {
    const selected = this.selectedOptions[sectionIndex]?.[questionIndex]; // Access the selected option for the section and question
    return selected !== null && this.getOptionLetter(this.currentSectionQuestions[questionIndex].options[selected]) === optionLetter;
}

  

  isCorrectOption(questionIndex: number, optionLetter: string): boolean {
    return this.currentSectionQuestions[questionIndex].correctAnswer === optionLetter; // Assuming optionLetter is a string like 'A', 'B', etc.
  }

  getAllQuestions() {
   
      // Assuming data is structured like your sections
      this.sections = this.sections; // Update sections with fetched data
      console.log("Fetched Sections: ", this.sections);
 
  }

  allQuestionsAnswered(): boolean {
    return this.selectedOptions.length === this.currentSectionQuestions.length && 
           this.selectedOptions.every(option => option !== null);
  }

  // Submit the quiz
  submitQuiz(): void {
    this.quizSubmitted = true;
    this.recordTimeForCurrentQuestion();
    // Reset counts
    // Calculate correct, wrong, and unattempted questions
    this.sections.forEach(section => {
      section.correctAnswersCount = 0; // Initialize
      section.wrongAnswersCount = 0; // Initialize
      section.unattemptedCount = 0; // Initialize
  
      section.questions.forEach(question => {
       // Assuming this.selectedOptions[question.questionId] might return a number.
       const userAnswer: string | null = this.selectedOptions[question.questionId]?.toString() || null;

// Assuming questionId maps to selectedOptions
        if (userAnswer === null) {
          console.log("useranswer null ",userAnswer);
          
          section.unattemptedCount++; // If no answer is selected
        } else if (userAnswer === question.correctAnswer) {
          console.log("useranswer correct ",userAnswer);
          
          section.correctAnswersCount++; // If the answer is correct
        } else {
          console.log("useranswer wrong ",userAnswer);
          section.wrongAnswersCount++; // If the answer is wrong
        }
      });
    });

    console.log("Quiz Submitted. Correct: ", this.correctCount, "Wrong: ", this.wrongCount, "Unattempted: ", this.unattemptedCount);
    console.log("Time taken per question (in seconds): ", this.timeTakenPerQuestion);
    console.log(this.sections);
  }

  resetTimeTracking(): void {
    this.questionStartTime = new Array(this.currentSectionQuestions.length).fill(0); // Track the start time of each question
    this.timeTakenPerQuestion = new Array(this.currentSectionQuestions.length).fill(0); // Track the time taken for each question
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
