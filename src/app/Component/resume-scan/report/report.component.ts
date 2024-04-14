import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  @Input() progress: number = 87; // Input property for progress value
  @Input() color: string = '#4caf50'; 
  searchabilityData = [
    { title: 'Contact info', infoIcon: true, tickIcon: true, content: ['You provided your phone number.','You provided your email.','We did not find an address in your resume.','Recruiters use your address to validate your location for job matches.'] },
    { title: 'Job title match', infoIcon: true, tickIcon: true, content: ['The Full Stack Developer job title provided or found in the job description was not found in your resume.',' We recommend having the exact title of the job for which youre applying in your resume.',' This ensures youll be found when a recruiter searches by job title.','If you havent held this position before, include it as part of your summary statement.'] },
    { title: 'Education match', infoIcon: true, tickIcon: true, content: ['This job doesn\'t specify a preferred degree.','Update required education level'] },
    { title: 'Section headings', infoIcon: true, tickIcon: true, content: ['We found the work experience section in your resume.','We found the education section in your resume.'] },
    { title: 'Date formatting', infoIcon: true, tickIcon: true, content: ['The dates in your work experience section are properly formatted.'] }
  ];
  allData=[
    {
        "section": "Searchability",
        "data": [
            {
                "title": "Contact info",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "You provided your phone number."},
                    {"tickIcon": false, "contentValue": "You provided your email."},
                    {"tickIcon": true, "contentValue": "We did not find an address in your resume."},
                    {"tickIcon": false, "contentValue": "Recruiters use your address to validate your location for job matches."}
                ]
            },
            {
                "title": "Job title match",
                "infoIcon": true,
                "content": [
                    {"tickIcon": false, "contentValue": "The Full Stack Developer job title provided or found in the job description was not found in your resume."},
                    {"tickIcon": true, "contentValue": "We recommend having the exact title of the job for which you're applying in your resume."},
                    {"tickIcon": true, "contentValue": "This ensures you'll be found when a recruiter searches by job title."},
                    {"tickIcon": true, "contentValue": "If you haven't held this position before, include it as part of your summary statement."}
                ]
            },
            {
                "title": "Education match",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "This job doesn't specify a preferred degree."},
                    {"tickIcon": true, "contentValue": "Update required education level"}
                ]
            },
            {
                "title": "Section headings",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "We found the work experience section in your resume."},
                    {"tickIcon": true, "contentValue": "We found the education section in your resume."}
                ]
            },
            {
                "title": "Date formatting",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "The dates in your work experience section are properly formatted."}
                ]
            }
        ]
    },
    {
        "section": "Recruiter Tips",
        "data": [
            {
                "title": "Word count",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "There are 596 words in your resume, which is under the suggested 1000 word count for relevance and ease of reading reasons."}
                ]
            },
            {
                "title": "Measurable results",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "We found 0 mentions of measurable results in your resume. Consider adding at least 5 specific achievements or impact you had in your job (e.g. time saved, increase in sales, etc)."}
                ]
            },
            {
                "title": "Job level match",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "You are applying to a(n) junior level role, but you held senior or higher level positions in the past. If you are a career changer in a new field, we recommend adding a summary statement to explain your shift in trajectory."}
                ]
            },
            {
                "title": "Words to avoid",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "We've found some negative phrases or cliches in your resume. view negative words"}
                ]
            }
        ]
    },
    {
        "section": "Hard Skills",
        "data": [
            {
                "title": "Word count",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "There are 596 words in your resume, which is under the suggested 1000 word count for relevance and ease of reading reasons."}
                ]
            }
        ]
    },
    {
        "section": "Soft Skills",
        "data": [
            {
                "title": "Word count",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "There are 596 words in your resume, which is under the suggested 1000 word count for relevance and ease of reading reasons."}
                ]
            }
        ]
    },
    {
        "section": "Keywords",
        "data": [
            {
                "title": "Word count",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "There are 596 words in your resume, which is under the suggested 1000 word count for relevance and ease of reading reasons."}
                ]
            }
        ]
    },
    {
        "section": "Formatting",
        "data": [
            {
                "title": "Font check",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "There are 596 words in your resume, which is under the suggested 1000 word count for relevance and ease of reading reasons."}
                ]
            },
            {
                "title": "Page Setup",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "We found 0 mentions of measurable results in your resume. Consider adding at least 5 specific achievements or impact you had in your job (e.g. time saved, increase in sales, etc)."}
                ]
            },
            {
                "title": "Layout",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "You are applying to a(n) junior level role, but you held senior or higher level positions in the past. If you are a career changer in a new field, we recommend adding a summary statement to explain your shift in trajectory."}
                ]
            },
            {
                "title": "Words to avoid",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "We've found some negative phrases or cliches in your resume. view negative words"}
                ]
            }
        ]
    },
    {
        "section": "Highlights",
        "data": [
            {
                "title": "Web Presence",
                "infoIcon": true,
                "content": [
                    {"tickIcon": true, "contentValue": "There are 596 words in your resume, which is under the suggested 1000 word count for relevance and ease of reading reasons."}
                ]
            }
        ]
    }
]

data:any;
title:any;
constructor(){
  console.log("data",this.allData);
}

}
