import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { QuizService } from 'src/app/Core/services/quiz.service';
import Swal from 'sweetalert2';
interface Section {
  section: string;
  questions: Question[];
  correctAnswersCount: number; // Add this line
  wrongAnswersCount: number; // Add this line
  unattemptedCount: number; // Add this line
  sectionIndex: number; // Add this property
}
interface Question{
  
}

@Component({
  selector: 'app-quiz-player',
  templateUrl: './quiz-player.component.html',
  styleUrls: ['./quiz-player.component.scss']
})
export class QuizPlayerComponent implements  OnInit, OnDestroy{
  timeMinutes:number=5;
  timeRemaining: number = this.timeMinutes * 60; // 30 minutes in seconds
  timerSubscription: Subscription | undefined;
  quizStarted:boolean=false;
  totalQuestions:number=0;

  sideNavStatus!:false;
   correctCount = 0;
  wrongCount = 0;
  unattemptedCount = 0;
  isDrawerHidden = false;

  toggleDrawer() {
    this.isDrawerHidden = !this.isDrawerHidden;
  }
  sections = [
    {
      section: 'Java',
      questions: [
        {
          questionId: 1,
          question: 'What is the default value of a boolean in Java?',
          options: [{ A: 'true' }, { B: 'false' }, { C: 'null' }, { D: 'undefined' }],
          selectedAnswer: '',
          correctAnswer: 'B',
          explaination: 'The default value of a boolean in Java is false.',
        },
        {
          questionId: 2,
          question: 'Which keyword is used to inherit a class in Java?',
          options: [{ A: 'extends' }, { B: 'implements' }, { C: 'inherits' }, { D: 'derives' }],
          selectedAnswer: '',
          correctAnswer: 'A',
          explaination: 'The "extends" keyword is used to inherit a class in Java.',
        },
        {
          questionId: 3,
          question: 'What is the size of an int in Java?',
          options: [{ A: '8 bits' }, { B: '16 bits' }, { C: '32 bits' }, { D: '64 bits' }],
          selectedAnswer: '',
          correctAnswer: 'C',
          explaination: 'The int in Java has a size of 32 bits (4 bytes).',
        },
      ],
      correctAnswersCount: 0,
      wrongAnswersCount: 0,
      unattemptedCount: 0,
      sectionIndex: 0,
    },
    {
      section: 'Collection API',
      questions: [
        {
          questionId: 4,
          question: 'Which interface does java.util.HashMap implement?',
          options: [{ A: 'List' }, { B: 'Set' }, { C: 'Map' }, { D: 'Queue' }],
          selectedAnswer: '',
          correctAnswer: 'C',
          explaination: 'HashMap implements the Map interface in Java.',
        },
        {
          questionId: 5,
          question: 'What is the time complexity of retrieving an element from a HashMap?',
          options: [{ A: 'O(1)' }, { B: 'O(n)' }, { C: 'O(log n)' }, { D: 'O(n^2)' }],
          selectedAnswer: '',
          correctAnswer: 'A',
          explaination: 'Retrieving an element from a HashMap has an average time complexity of O(1).',
        },
      ],
      correctAnswersCount: 0,
      wrongAnswersCount: 0,
      unattemptedCount: 0,
      sectionIndex: 1,
    },
    {
      section: 'Java 8',
      questions: [
        {
          questionId: 6,
          question: 'Which feature was introduced in Java 8?',
          options: [{ A: 'Streams API' }, { B: 'Generics' }, { C: 'Annotations' }, { D: 'Reflection' }],
          selectedAnswer: '',
          correctAnswer: 'A',
          explaination: 'The Streams API was introduced in Java 8 to facilitate functional programming.',
        },
        {
          questionId: 7,
          question: 'What is a lambda expression in Java?',
          options: [
            { A: 'An anonymous function' },
            { B: 'A class definition' },
            { C: 'A new type of method' },
            { D: 'A package' },
          ],
          selectedAnswer: '',
          correctAnswer: 'A',
          explaination: 'Lambda expressions are anonymous functions in Java.',
        },
      ],
      correctAnswersCount: 0,
      wrongAnswersCount: 0,
      unattemptedCount: 0,
      sectionIndex: 2,
    },
    {
      section: 'Microservices',
      questions: [
        {
          questionId: 8,
          question: 'Which protocol is commonly used for communication between microservices?',
          options: [{ A: 'HTTP' }, { B: 'FTP' }, { C: 'SMTP' }, { D: 'POP3' }],
          selectedAnswer: '',
          correctAnswer: 'A',
          explaination: 'HTTP is the most commonly used protocol for communication between microservices.',
        },
        {
          questionId: 9,
          question: 'Which of the following is a key characteristic of microservices?',
          options: [
            { A: 'Monolithic architecture' },
            { B: 'Single deployment unit' },
            { C: 'Small, independently deployable services' },
            { D: 'Tightly coupled services' },
          ],
          selectedAnswer: '',
          correctAnswer: 'C',
          explaination: 'Microservices are small, independently deployable services.',
        },
      ],
      correctAnswersCount: 0,
      wrongAnswersCount: 0,
      unattemptedCount: 0,
      sectionIndex: 3,
    },
    {
      section: 'Spring Boot',
      questions: [
        {
          questionId: 10,
          question: 'What annotation is used to mark a class as a Spring Boot application?',
          options: [
            { A: '@SpringBootApplication' },
            { B: '@RestController' },
            { C: '@Service' },
            { D: '@Component' },
          ],
          selectedAnswer: '',
          correctAnswer: 'A',
          explaination: 'The @SpringBootApplication annotation is used to mark a class as the main entry point for a Spring Boot application.',
        },
        {
          questionId: 11,
          question: 'Which tool does Spring Boot use for dependency management?',
          options: [{ A: 'Maven' }, { B: 'Ant' }, { C: 'Jenkins' }, { D: 'Gradle' }],
          selectedAnswer: '',
          correctAnswer: 'A',
          explaination: 'Spring Boot commonly uses Maven for dependency management, though Gradle can also be used.',
        },
      ],
      correctAnswersCount: 0,
      wrongAnswersCount: 0,
      unattemptedCount: 0,
      sectionIndex: 4,
    },
  ];
  

  currentQuestionIndex = 0;
  currentSectionIndex = 0;
  public allQuestions: any[] = [];
  selectedOptions: (number | null)[][] = []; // Array of arrays to hold selected options for each section
  quizSubmitted = false;

  questionStartTime: number[] = []; // Store start time for each question
  timeTakenPerQuestion: number[] = []; // Store time taken for each question in seconds

  constructor(private quizService: QuizService,private cdr: ChangeDetectorRef) {
    this.resetTimeTracking();
  }
  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
    this.submitQuiz();
  }
  startQuiz(){
    this.quizStarted=true;
    this.startTimer();
  }
  ngOnInit(): void {
    this.allQuestions = this.getAllQuestions();
    console.log("All ",this.allQuestions);
    this.totalQuestions=this.allQuestions.length;
    
  }
  getFormattedTime() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
  
  handleOptionSelected(event: { sectionIndex: number; questionIndex: number;question:any, option: string; correct: boolean }) {
    const sectionIndex = event.sectionIndex;
    const questionIndex = event.questionIndex;
    const questionId=event.question.questionId;
    const optionLabel = Object.keys(event.option)[0];
    // Ensure that selectedOptions is initialized for the section
    if (!this.selectedOptions[sectionIndex]) {
      this.selectedOptions[sectionIndex] = [];
    }
    console.log("questionId",questionId);  
    
    // Store only the index of the selected option for the specific section and question
    this.selectedOptions[sectionIndex][questionIndex] = this.getOptionIndex(optionLabel);
    this.sections[sectionIndex].questions[questionIndex].selectedAnswer = optionLabel;
    console.log(`Section ${sectionIndex + 1}, Question ${questionIndex + 1}: Option ${optionLabel}`);
    // Restart timer after selection
    console.log("selected options ",JSON.stringify(this.sections));
    this.startTimerForCurrentQuestion();
}
getStatistics(): { section: string; totalQuestions: number; correctAnswers: number; unattemptedQuestions: number; percentage: number }[] {
  return this.sections.map((sectionData) => {
    const totalQuestions = sectionData.questions.length;

    // Count correct answers
    const correctAnswers = sectionData.questions.filter((question) => {
      return question.selectedAnswer && question.selectedAnswer === question.correctAnswer;
    }).length;

    // Count unattempted questions
    const unattemptedQuestions = sectionData.questions.filter((question) => {
      return question.selectedAnswer === undefined || question.selectedAnswer === null;
    }).length;

    // Calculate the percentage of correct answers
    const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    return {
      section: sectionData.section,
      totalQuestions,
      correctAnswers,
      unattemptedQuestions, // Include unattempted questions in the return value
      percentage: parseFloat(percentage.toFixed(2)) // Keep two decimal places
    };
  });
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
    // Access the selected option for the section and question
    const selectedOptionIndex = this.selectedOptions[sectionIndex]?.[questionIndex];
    
    // Check if the selected option is not null or undefined
    if (selectedOptionIndex !== null && selectedOptionIndex !== undefined) {
      // Get the option letter of the selected option using the index
      const selectedOptionLetter = this.getOptionLetter(this.sections[sectionIndex].questions[questionIndex].options[selectedOptionIndex]);
      
      // Return whether the selected option matches the current option letter
      return selectedOptionLetter === optionLetter;
    }
  
    // Return false if no option is selected
    return false;
  }
  
  getOptionValue(option: { [key: string]: string }, optionLetter: string): string | undefined {
    // Return the value associated with the optionLetter key in the option object
    return option[optionLetter];
  }
  
  

isCorrectOption(sectionIndex: number, questionIndex: number, optionLetter: string): boolean {
  // Access the specific question from the flattened array based on section and question index
  const question = this.sections[sectionIndex].questions[questionIndex];

  // Check if the correct answer matches the option letter
  return question.correctAnswer === optionLetter;
}


  getAllQuestions() {
    return this.sections.flatMap((section, sectionIndex) => 
      section.questions.map((question, questionIndex) => ({
        ...question,
        section: section.section, // Keep track of the section name
        sectionIndex,
        questionIndex
      }))
    );
  }
  

  allQuestionsAnswered(): boolean {
    return this.selectedOptions.length === this.currentSectionQuestions.length && 
           this.selectedOptions.every(option => option !== null);
  }

  // Submit the quiz
  submitQuiz(): void {
    Swal.fire({
      title: 'Are you Sure?',
      text: 'You want to Submit the Quiz',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit it',
      cancelButtonText: 'No, Dont submit'
    }).then((result) => {
      // If user confirms the action
      if (result.isConfirmed) {
       
        this.quizSubmitted = true;
        this.recordTimeForCurrentQuestion();
      
        // Reset counts for each section
        this.sections.forEach((section) => {
          section.correctAnswersCount = 0; // Initialize
          section.wrongAnswersCount = 0; // Initialize
          section.unattemptedCount = 0; // Initialize
      
          section.questions.forEach((question) => {
            console.log("Question ", JSON.stringify(question));
      
            // Access the selected answer directly from the question
            const userAnswer: string | null = question.selectedAnswer ?? null;
      
            // Check the user's answer
            if (!userAnswer) {
              console.log("User answer is null (unattempted) for question: ", question.questionId);
              section.unattemptedCount++; // If no answer is selected
            } else if (userAnswer === question.correctAnswer) {
              console.log("User answer is correct for question: ", question.questionId);
              section.correctAnswersCount++; // If the answer is correct
            } else {
              console.log("User answer is wrong for question: ", question.questionId);
              section.wrongAnswersCount++; // If the answer is wrong
            }
          });
        });
      
        // Calculate overall counts
        const totalCorrect = this.sections.reduce((acc, section) => acc + section.correctAnswersCount, 0);
        const totalWrong = this.sections.reduce((acc, section) => acc + section.wrongAnswersCount, 0);
        const totalUnattempted = this.sections.reduce((acc, section) => acc + section.unattemptedCount, 0);
      
        console.log("Quiz Submitted. Correct: ", totalCorrect, "Wrong: ", totalWrong, "Unattempted: ", totalUnattempted);
        console.log("Time taken per question (in seconds): ", this.timeTakenPerQuestion);
        console.log(this.sections);
        this.cdr.detectChanges();
       
      }
    });
   
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
  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.submitQuiz(); // Automatically submit when time runs out
        this.timerSubscription?.unsubscribe(); // Stop the timer
      }
    });
  }
}
