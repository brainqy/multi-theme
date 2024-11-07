import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddquizService } from 'src/app/Core/services/addquiz.service';

@Component({
  selector: 'app-quiz-store',
  templateUrl: './quiz-store.component.html',
  styleUrls: ['./quiz-store.component.scss']
})
export class QuizStoreComponent {
  quizzes = [
    { subject: 'Java', numberOfQuestions: 20, time: 5, level: 'Hard', attempts: 5 ,quizId:'quiz1000'},
    { subject: 'Java', numberOfQuestions: 25, time: 5, level: 'Medium', attempts: 3 ,quizId:'quiz1001'},
    { subject: 'Java', numberOfQuestions: 15, time: 5, level: 'Easy', attempts: 2 ,quizId:'quiz1002'},
    { subject: 'Angular', numberOfQuestions: 18, time: 5, level: 'Medium', attempts: 1 ,quizId:'quiz1003'},
    { subject: 'AWS', numberOfQuestions: 30, time: 5, level: 'Hard', attempts: 4 ,quizId:'quiz1004'},
    { subject: 'React', numberOfQuestions: 22, time: 5, level: 'Easy', attempts: 6 ,quizId:'quiz1005'},
    { subject: 'Javascript', numberOfQuestions: 22, time: 5, level: 'Easy', attempts: 6 ,quizId:'quiz1006'},
    { subject: 'SQL', numberOfQuestions: 22, time: 5, level: 'Easy', attempts: 6 ,quizId:'quiz1007'}


  ]; 
  //quizzes: any[] = [];
  filteredQuizzes = this.quizzes;
  filterText = '';
  sideNavStatus!:false;
  constructor(private router:Router,private quizService: AddquizService)
  {}
  ngOnInit(): void {
    this.filterQuizzes();
    this.quizzes = this.quizService.getQuizzes();
  }
  createQuiz(): void {
    // Logic to create a new quiz
    console.log('Create Quiz button clicked');
    this.router.navigateByUrl("/create-quiz");
  }

  filterQuizzes(): void {
    const filter = this.filterText.toLowerCase();
    this.filteredQuizzes = this.quizzes.filter(quiz =>
      quiz.subject.toLowerCase().includes(filter)
    );
  }
}
