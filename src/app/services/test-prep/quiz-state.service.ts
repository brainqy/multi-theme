import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizStateService {
  private selectedOptionsSubject = new BehaviorSubject<(number | null)[]>([]);
  selectedOptions$ = this.selectedOptionsSubject.asObservable();

  constructor() {}

  setSelectedOption(questionIndex: number, optionIndex: number | null) {
    const selectedOptions = this.selectedOptionsSubject.getValue();
    selectedOptions[questionIndex] = optionIndex;
    this.selectedOptionsSubject.next(selectedOptions);
  }

  getSelectedOption(questionIndex: number): number | null {
    const selectedOptions = this.selectedOptionsSubject.getValue();
    return selectedOptions[questionIndex];
  }

}
