import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobScanService } from 'src/app/Core/services/job-scan.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent  implements OnInit{
  @Input() progress: number = 87; // Input property for progress value
  @Input() color: string = '#4caf50'; 
  allData:any;
data:any;
title:any;
  finalProgress: any;
  dataTransefer: any;
constructor( private reportService:JobScanService,private route: ActivatedRoute){
 this.generateReport();
 
}
ngOnInit() {

}
setNumber: boolean = true;
clicked: boolean = false;
number: number = 1; // Or any default number you want to display

toggleClicked(): void {
  this.clicked = !this.clicked;
  console.log("click",this.clicked);
}
tada=[
  {id:1,value:"Add resume and job description",isVerify:true},
  {id:2,value:"Add suggestions below to your resume",isVerify:true},
  {id:3,value:"Upload resume & rescan",isVerify:false}
]

toggleVerify(item: any) {
  item.isVerify = !item.isVerify;
}
generateReport() {
   const randomString =this.generateRandomString(8);
  const resume = "Dnyaneshwar Somwanshi Pune, Maharashtra  state | +917972213995 email id dvsomwanshi@gmail.com Professional Goals Secure a responsible career opportunity to fully utilize my knowledge and skills while making a significant contribution to the personal and organization's growth. Professional Summary *An experienced Java developer with 5+ years of experience *My work include designing, low energy programming and testing of cloud native microservices *Involvement in architecture discussion and decision making. -Expertise in microservice architecture and migration projects to microservice architecture *Knowledge of AWS cloud platform *Expertise in working in Agile framework. *knowledge of JIRA,Confluence, Agile and Scrum *TeamLeader with strong analytical, problem solving and organizational capabilities * Excellent team player with great communication and collaborative skills. * Capability of analyzing the problem and thereby providing appropriate solution * Knowledge of Software Configuration Management tools as git. * Knowledge of Jira Bug Reporting and Tracking tools. Projects Exam Management System (Core java ,JSP 2.3, Spring Boot, Hibernate, HTML,CSS, JavaScript, JQUERY, MySQL, Microservices ) This project provides services for Educational Organizations. It is an integrated solution for schools, colleges and institutions which is related to education by using our project students can register them for the admission process. The organization manages all the activities by using our project such as admission process, fees management, course management, library management, notification management. Staffing Solution (Java, Springboot , Hibernate, AWS, Angular, MySQL 5.0 etc. ) In this project the Recruiter or HR Group of the company registered themselves. Registered recruiters can access student Information and view the CV. Recruiter can send mail individually to the student and to the Training and Placement officer of the Institute for Scheduling the Interview. Recruiter searches the student of the Institute on the basis of percentage, qualification and skills. Registered students also login their account, update profile information and CV, update password, and can also delete their account. Tutor Management System (Core java, JSP 2.3, Spring, Hibernate, HTML,CSS, JavaScript, JQUERY, MySQL 5.0 microservices. ) In this project the students can post their requirements and the teacher can apply for such enquiries. Teacher needs to purchase coins from the admin in order to apply for the inquiry. After the class, students can rate their teacher and depending on the rating teacher will get more number of classes. Hosting of Active Workspace in Teamcenter (Selenium, webview, teamcenter 12.4 ) Broken Link Doctor The Broken Link Doctor project, built with Java and Spring Boot, detects and suggests fixes for broken links in JavaDoc files. It incorporates an automated scheduler for periodic scans, ensuring timely detection. Utilizing Spring Boot's features, it offers a RESTful API for manual scans and configuration. The system logs events and supports reporting for detailed analysis. With integration testing ensuring reliability, it provides a seamless solution for maintaining documentation integrity. (Selenium , java) YTMS (java, spring boot, angular,mysql, Rest api ,Spring Security) The YTMS (Internal Training and Management Solution) project serves as an internal platform tailored for managing candidates on the bench. It facilitates their upskilling by allowing requests for courses available on the platform or external ones. The system tracks candidate progress, suggests relevant courses, and provides personalized learning paths. Administrators can manage course offerings, track resource utilization, and generate reports on skill gaps. Utilizing data analytics, it predicts skill demands and recommends courses accordingly. Additionally, it features gamification elements, peer-to-peer learning forums, and mentorship programs to foster a collaborative learning environment. Integrations with HR systems streamline candidate management processes. EXPERIENCE Senior Software Engineer Sep 2023 - Present Yash Technologies, Pune Senior Software Engineer Aug 2021 - Sep 2023 Intelizign, Pune Software Engineer May 2018 - Aug 2021 Ingecno Technologies, Pune EDUCATION M.E Aug 2013 - May 2016 SKNCOE, Pune B.Tech Jul 2007 - May 2012 Dr. B.A.T.U. Lonere, Raigad";
  const jobDescription = "We are looking for a highly skilled computer programmer who is comfortable with both front and back end programming. Full Stack Developers are responsible for developing and designing front end web architecture, ensuring the responsiveness of applications and working alongside graphic designers for web design features, among other duties. Full Stack Developers will be required to see out a project from conception to final product, requiring good organizational skills and attention to detail. Full Stack Developer Responsibilities: Developing front end website architecture. Designing user interactions on web pages. Developing back end website applications. Creating servers and databases for functionality. Ensuring cross-platform optimization for mobile phones. Ensuring responsiveness of applications. Working alongside graphic designers for web design features.  Seeing through a project from conception to finished product. Designing and developing APIs. Meeting both technical and consumer needs. Staying abreast of developments in web applications and programming languages. Full Stack Developer Requirements: Degree in Computer Science. Strong organizational and project management skills. Proficiency with fundamental front end languages such as HTML, CSS and JavaScript. Familiarity with JavaScript frameworks such as Angular JS, React and Amber. Proficiency with server side languages such as Python, Ruby, Java, PHP and .Net. Familiarity with database technology such as MySQL, Oracle and MongoDB. Excellent verbal communication skills. Good problem solving skills. Attention to detail.";
  this.reportService.generateReport(resume, jobDescription,randomString).subscribe(
    (data: any) => {
      console.log("job scan report "+JSON.stringify(data)); // Handle the response here
      this.allData=data.allData;
      console.log("this.dataTransefer ",this.dataTransefer)
    },
    (error: any) => {
      console.error(error); // Handle error if any
    }
  );
 
}
generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
printwindows(){
  window.print();
}
}
