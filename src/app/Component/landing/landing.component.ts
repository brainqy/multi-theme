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
  testimonials = [
    {
      name: 'Lisa Redfern',
      image: '//c2.staticflickr.com/8/7310/buddyicons/24846422@N06_r.jpg',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It is a long established fact that a reader will be distracted by the readable its layout.',
      rating: 5
    },
    {
      name: 'Cassi',
      image: 'https://res.cloudinary.com/hnmqik4yn/image/upload/c_fill,fl_force_strip,h_128,q_100,w_128/v1493982718/ah57hnfnwxkmsciwivve.jpg',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It is a long established fact that a reader will be distracted by the readable its layout.',
      rating: 4
    },
    {
      name: 'Md Nahidul',
      image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/451270/profile/profile-80.jpg',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It is a long established fact that a reader will be distracted by the readable its layout.',
      rating: 5
    }
  ];
  items = ['First', 'Second', 'Third'];
  
  constructor(private config: NgbCarouselConfig) {
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
