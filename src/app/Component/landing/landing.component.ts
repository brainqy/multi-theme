import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
export interface LandingData {
  videoUrl: string;
  dynamicText: string;
  main_title: string;
  text1_body: string;
  text2_body: string;
  text3_body: string;
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  landingData: LandingData = {
    videoUrl: '',
    dynamicText: '',
    main_title: '',
    text1_body: '',
    text2_body: '',
    text3_body: ''
  };

  videoWidth: number = 900;
  videoHeight: number = 450;
  text: string = "Hello, customize me!";
  fontSize: string = '16px'; // Ensure it's initialized as a string
  fontFamily: string = 'Arial';
  color: string = '#000000';
  testimonials: any[] =  [
    {
      "title":"awesome",
      "name": "Jayashree C.",
      "position": "Product Manager",
      "rating": 5,
      "date": "Jan 9, 2024",
      "text": "I like the app and I'm using it a lot. The power edit needs to be refined. I didn't like what it kicked back. Also when I ..."
    },
    {"title":"Good Job",
      "name": "Mohan Pawar.",
      "position": "Lead Engineer",
      "rating": 5,
      "date": "Jan 30, 2024",
      "text": "UPDATE - I realized I made a mistake when I originally uploaded my resume. I didn't include a job description, I uploaded ..."
    },
    {"title":"Very nice Service",
      "name": "Jeevan Pandit.",
      "position": "Senior Software Engineer",
      "rating": 5,
      "date": "Dec 23, 2023",
      "text": "I had been applying for jobs but my resume was getting automatically rejected. After I started using this program and inco ..."
    }
  ];

  

  ngOnInit(): void {
  
  }
  items = ['First', 'Second', 'Third'];
  
  constructor(private config: NgbCarouselConfig,private http: HttpClient) {
    this.getlandingData();
    config.interval = 5000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  // Method to fetch landing data from service
  getlandingData() {
   
  }

  // Method to get video URL
  getVideoUrl(): string {
    return `C:/Users/DELL/Projects/Full Stack/NPSR/multi-tent/uploads/${this.landingData.videoUrl}`;
  }

  // Method to update font style


  // Method to update font size
  updateFontSize(value: number) {
    this.fontSize = `${value}px`;
  }

  // Method to parse font size
  parseFontSize(): number {
    return parseInt(this.fontSize, 10); // Parse integer part of fontSize
  }

}
