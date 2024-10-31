import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddquizService } from 'src/app/Core/services/addquiz.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent {
  quiz = {
    subject: '',
    numberOfQuestions: 0,
    time: 0,
    level: 'Easy',
    attempts: 0,
    questions: []
  };


  constructor(private router: Router,private quizService: AddquizService) {}
  goToSelectQuestions(): void {
    this.router.navigate(['/select-questions']);
  }
  onSubmit(): void {
    this.quizService.startNewQuiz(this.quiz);
    this.router.navigate(['/select-questions']);
  }
}
