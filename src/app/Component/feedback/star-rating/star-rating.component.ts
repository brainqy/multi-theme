import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  onStarClick(index: number): void {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
  }

}
