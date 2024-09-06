import { Component } from '@angular/core';
import { QuizService } from 'src/app/Core/services/quiz.service';

@Component({
  selector: 'app-quiz-bank',
  templateUrl: './quiz-bank.component.html',
  styleUrls: ['./quiz-bank.component.scss']
})
export class QuizBankComponent {
  allQ: any;
  constructor(private quizService:QuizService){
    this.getAllQuestions();
    }
  getAllQuestions(){
    this.quizService.getQuestions().subscribe((data)=>{
      this.allQ=data;
    console.log(" this.allQ ", this.allQ);
    
    })
      }
}
