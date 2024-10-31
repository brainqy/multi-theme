import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddquizService {

  private quizzes: any[] = [];
  private currentQuiz: any | null = null;

  constructor() {}

  // Method to retrieve all quizzes
  getQuizzes(): any[] {
    return this.quizzes;
  }

  // Method to start a new quiz and set it as the current quiz
  startNewQuiz(quiz: any): void {
    this.currentQuiz = quiz;
    this.quizzes.push(quiz);  // Add to the list for display
  }

  // Method to retrieve the current quiz being created
  getCurrentQuiz(): any | null {
    return this.currentQuiz;
  }
}
