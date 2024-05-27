import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-custom-slider',
  templateUrl: './custom-slider.component.html',
  styleUrls: ['./custom-slider.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})

export class CustomSliderComponent implements OnInit {
  items = [
    { id: 1, review: 'Nice' },
    { id: 2, review: 'Wow, it is a really nice platform' },
    { id: 3, review: 'Nice' },
    { id: 4, review: 'Wow, it is a really nice platform' },
    { id: 5, review: 'Nice' },
    { id: 6, review: 'Wow, it is a really nice platform' },
    { id: 7, review: 'Nice' },
    { id: 8, review: 'Wow, it is a really nice platform' }
  ];

  groupedItems: any[] = [];
  currentIndex = 0;

  ngOnInit(): void {
    this.groupItems();
  }

  groupItems(): void {
    const groupSize = 1; // Number of items per group for the column layout
    for (let i = 0; i < this.items.length; i += groupSize) {
      this.groupedItems.push(this.items.slice(i, i + groupSize));
    }
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.groupedItems.length - 1;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex < this.groupedItems.length - 1) ? this.currentIndex + 1 : 0;
  }
}
