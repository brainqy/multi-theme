import { Component } from '@angular/core';
import { Resume, ResumeService } from 'src/app/Core/services/resume.service';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.scss']
})
export class ResumesComponent {
  resumes: Resume[] = [];

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes() {
    this.resumeService.getResumes().subscribe(
      (data: Resume[]) => {
        this.resumes = data;
      },
      (error) => {
        console.error('Error fetching resumes:', error);
      }
    );
  }
  toggleStar(item: any) {
    this.resumeService.saveAsStarred(item.id).subscribe(res=>{
      console.log("res",res);
      window.location.reload();
    })
  }

}
