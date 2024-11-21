import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getBootstrapBaseClassPlacement } from '@ng-bootstrap/ng-bootstrap/util/positioning';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  experiences = [
    {
      role: 'Product Designer, Lunchbox',
      location: 'Ukraine, Kiev',
      dates: '01/01/2020 - 01/07/2021',
      details: [
        'Designed and launched several digital products...',
        'Worked closely with developers...',
      ],
    },
  ];
  skillsList: string[] = [];
  summary: string = '';
  newSkill = '';
  personalDetails = {
    name: '',
    role: '',
    contact: ''
  };

  experienceList: any[] = [];
  educationList: any[] = [];

  newExperience = {
    jobTitle: '',
    company: '',
    location: '',
    dateRange: '',
    description: ''
  };

  newEducation = {
    degree: '',
    institution: '',
    year: ''
  };

  showExperienceModal = false;
  showEducationModal = false;
  showSkillsModal = false;
  showSummaryModal = false;
  isSubmitted = false; // Flag to track form submission
  constructor(private modalService: NgbModal){

  }
  onSaveDetails() {
    console.log(this.personalDetails);
    this.isSubmitted = true; // Set to true after form submission
    this.modalService.dismissAll();
  }

  openExperienceModal() {
    this.showExperienceModal = true;
  }

  closeExperienceModal() {
    this.showExperienceModal = false;
  }

  openEducationModal() {
    this.showEducationModal = true;
  }

  closeEducationModal() {
    this.showEducationModal = false;
  }


  openSummaryModal(content: any) {
    this.modalService.open(content);
}


  closeSummaryModal() {
    this.showSummaryModal = false;
  }


  onAddExperience() {
    this.experienceList.push({ ...this.newExperience });
    this.newExperience = { jobTitle: '', company: '', location: '', dateRange: '', description: '' };
    this.closeExperienceModal();
  }

  onAddEducation() {
    this.educationList.push({ ...this.newEducation });
    this.newEducation = { degree: '', institution: '', year: '' };
    this.closeEducationModal();
  }
  openSkillsModal() {
    this.showSkillsModal = true;
  }

  // Close Modal
  closeSkillsModal() {
    this.showSkillsModal = false;
  }

  // Add a New Skill
  onAddSkill() {
    if (this.newSkill && !this.skillsList.includes(this.newSkill)) {
      this.skillsList.push(this.newSkill.trim());
      this.newSkill = '';
      this.closeSkillsModal();
    }
  }
  openPersonalDetailsModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
}
  onSaveSummary() {
    console.log("",this.summary);
    
    this.closeSummaryModal();
  }
}
