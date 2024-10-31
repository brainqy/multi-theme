import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddquizService } from 'src/app/Core/services/addquiz.service';

@Component({
  selector: 'app-select-que',
  templateUrl: './select-que.component.html',
  styleUrls: ['./select-que.component.scss']
})
export class SelectQueComponent {
  questionBank: any[] = [];
  selectedQuestions: any[] = [];
  currentQuiz: any | null = null

  constructor(
    private http: HttpClient,
    private quizService: AddquizService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Load question bank
    this.http.get<any[]>('/assets/question-bank.json').subscribe(data => {
      this.questionBank = data;
    });

    // Get the current quiz
    this.currentQuiz = this.quizService.getCurrentQuiz();

    // Handle missing currentQuiz (in case the user navigates directly)
    if (!this.currentQuiz) {
      alert('No quiz to add questions to. Redirecting to quiz creation.');
      this.router.navigate(['/create-quiz']);
    }
  }

  toggleQuestionSelection(question: any): void {
    const index = this.selectedQuestions.findIndex(q => q.id === question.id);
    if (index === -1) {
      this.selectedQuestions.push(question);
    } else {
      this.selectedQuestions.splice(index, 1);
    }
  }

  saveQuiz(): void {
    if (this.currentQuiz) {
      this.currentQuiz.questions = this.selectedQuestions;
      alert('Quiz created successfully with selected questions!');
      this.router.navigate(['/']);
    }
  }
}
