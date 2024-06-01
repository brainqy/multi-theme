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

  faqs = [
    {
      question: 'What is Job Match?',
      answer: 'Job Match is an online tool that helps job seekers optimize their resumes and LinkedIn profiles to increase their chances of getting interviews. It uses AI technology to analyze job listings and provide personalized recommendations.'
    },
    {
      question: 'How does Job Match work?',
      answer: 'Job Match works by scanning your resume or LinkedIn profile and comparing it to the job description. It identifies the key skills and keywords that are missing and provides suggestions for improving your documents to match the job requirements.'
    },
    {
      question: 'How do I know if my resume is ATS-compliant?',
      answer: 'Each Applicant Tracking System has different methods of scanning and filtering resumes. A resume scanner will be able to detect formatting errors that make your resume hard to understand for different Applicant Tracking Systems. Job Match’s resume scanner will give you a match rate based on top ATS including iCIMS, Recruiterbox, Lever, Greenhouse, and Taleo.'
    },
    {
      question: 'What is a good ATS score for a resume?',
      answer: 'We recommend a match rate score of 75%. However, many career counselors and Job Match users see success even with just a 65% match rate. There is such a thing as an over-optimized resume. The general rule is that a higher score is better, but it might not be possible to score above 75% without overstuffing your resume with keywords.'
    },
    {
      question: 'Do ATS scan resumes?',
      answer: 'Each system offers a different combination and scope of features, but ATS are primarily used to help hiring companies collect, organize, and filter applicants. That means that an ATS will scan your resume and search for certain keywords, skills, job titles, and education that the recruiter is looking for. Job seekers who submit their resume and job application through an online form are interacting with an ATS.'
    },
    {
      question: 'Can ATS detect PDF?',
      answer: 'Our tests have shown that some applicant tracking systems more accurately parse .docx resumes. For this reason, we recommend uploading your resume in the .docx (Microsoft Word) format when applying to a job, unless the job posting requests a PDF.'
    },
    {
      question: 'What is a Resume Checker?',
      answer: 'A resume checker will scan your resume and compare it to a job description. The checker will show you if your resume is optimized for an ATS and for the job listing. To ensure that the resume is optimized for an ATS, the resume checker will check the formatting and file type. It will compare the text in the resume to see if it matches the skills, keywords, job titles, and education requirements mentioned in the job listing.'
    },
    {
      question: 'How to make an ATS-friendly resume',
      answer: 'Here are some quick tips on how to beat applicant tracking systems:\n<ul>\n<li>Tailor your resume to the specific job you are applying for.</li>\n<li>Match your resume keywords to skills found in the job description.</li>\n<li>Use long-form and acronym versions of keywords.</li>\n<li>Use Chronological or Hybrid resume format.</li>\n<li>Don’t use tables, columns, or graphics.</li>\n<li>Use a screen-friendly, traditional font.</li>\n<li>Don’t use headers or footers.</li>\n<li>Use standard resume section headings.</li>\n<li>Save Your File as a .docx if possible</li>\n</ul>'
    },
    {
      question: 'How does Job Match work?',
      answer: 'Job Match improves job placement by helping job seekers land 3X more interviews and cutting job search time in half. Job Match uses artificial intelligence and machine learning technology to give job seekers an instant analysis of how well their resume and cover letter are tailored for a particular job and how they can optimize their application materials to combat applicant tracking systems (ATS).\n\nHere’s the process: Upload your resume and copy-and-paste a job listing you’re applying for. Job Match will analyze your resume for formatting errors, key qualifications, hard skills, best practices, word count, tone, and more. View your match rate to see how closely your resume matches the job you’re applying for. Then, optimize your resume with personalized suggestions based on the job description you entered. As you make changes, you’ll see your match rate improve!\n\nUse Job Match for every job application to increase your chances of getting an interview. Upload the new job listing and your optimized resume, and Job Match will analyze the new job listing against your current resume to help you optimize for each new job you apply to.'
    },
    {
      question: 'What features are available with Job Match?',
      answer: '<ul>\n<li>Resume Scanner: Checks your resume against common Applicant Tracking Systems (ATS) to see how your resume performs and provides a match rate score.</li>\n<li>LinkedIn Profile Analysis: Analyzes your LinkedIn profile and provides suggestions for improvement.</li>\n<li>Cover Letter Analyzer: Scans your cover letter and gives feedback on how well it matches the job listing.</li>\n<li>Keyword Optimizer: Identifies key skills and keywords missing from your resume and suggests where to add them.</li>\n<li>Formatting Checker: Detects formatting issues that may affect how your resume is read by ATS.</li>\n</ul>'
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
  toggleNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    } else {
      navbarCollapse?.classList.add('show');
    }
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
