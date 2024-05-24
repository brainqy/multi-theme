import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  sliceIndex:any;
  // Assuming 'plans' is an array of objects representing each plan
plans = [
  { title: 'Free', subtitle: '$0 forever', details: ['5 Free scans upon signup', '2 Free scans every month', '5 Keyword Comparisons / month', 'Limited Scan History', 'Resume Manager', 'Jobscan Learning Center'] },
  { title: 'Quarterly', subtitle: '$49.95 $29.99 per month', details: [
    'Unlimited Match Rate calculations',
    'Unlimited Keyword Comparisons',
    'Unlimited Scan History',
    'LinkedIn Optimization (after trial)',
    'Cover Letter Optimization',
    'Resume Power Edit',
    'Job Tracker',
    'Predicted Skills',
    'Resume Manager',
    'Jobscan Learning Center',
    'Jobs Matcher',
    'Premium ATS & Recruiter Findings',
    'ATS Revealed eBook',
    'ATS Friendly Resume Templates',
    'Premium Cover Letter Template'
  ] },
  { title: 'Monthly', subtitle: '$49.95 per month', details: [
    'Unlimited Match Rate calculations',
    'Unlimited Keyword Comparisons',
    'Unlimited Scan History',
    'LinkedIn Optimization',
    'Cover Letter Optimization',
    'Resume Power Edit',
    'Job Tracker',
    'Predicted Skills',
    'Resume Manager',
    'Jobscan Learning Center',
    'Jobs Matcher',
    'Premium ATS & Recruiter Findings',
    'ATS Revealed eBook',
    'ATS Friendly Resume Templates',
    'Premium Cover Letter Template'
  ] }
];

constructor(){
  this.sliceIndex = Math.floor(this.faqs.length / 2);
}
  
  ngOnInit(): void {
  }
  
  sideNavStatus:boolean=false;
  faqs: { question: string, answer: string }[] = [
    {
      question: 'How long will my free trial last?',
      answer: 'You will have 2 weeks from the time you start your trial.'
    },
    {
      question: 'When will I be billed after my free trial?',
      answer: 'Once your trial ends, you will be billed for the next quarter of your subscription if you selected a quarterly plan.'
    },
    {
      question: 'Can I cancel my free trial?',
      answer: 'You may cancel your trial at any time before the end of your trial period. If you cancel on or before your trial expiration date, your account will not be charged for the cost of the plan you selected when you signed up for your trial. There is no trial period if you opted out to gain full access to LinkedIn Optimization or selected a monthly plan. You can cancel your plan directly in Jobscan or contact our support team to help.'
    },
    {
      question: 'Can I cancel any time?',
      answer: 'You may cancel at any time directly in Jobscan or contact our support team to help.'
    },
    {
      question: 'What forms of payment do you accept?',
      answer: 'You can purchase Jobscan with any major credit card.'
    },
    {
      question: 'Will I be charged sales tax?',
      answer: 'Yes. We will apply state and local sales tax based on your billing address.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'If you cancel your plan before the next renewal cycle, you will retain access to paid features until the end of your subscription period. When your subscription expires, you will lose access to paid features and all data associated with those features.'
    },
    {
      question: 'Is my data safe and secure?',
      answer: 'We use industry-standard encryption to protect your information. We do not store your credit card information. We regularly back up your data to prevent data loss and aid in recovery to better protect your information.'
    },
  ];
}
