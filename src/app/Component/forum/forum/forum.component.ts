import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentReportService } from 'src/app/Core/services/content-report.service';
import { Forum, ForumService } from 'src/app/Core/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {


  sideNavStatus:boolean=false;
  forumPost: any;
  forumId!: number;
  allReport!: any;
  uniqueTags!: Set<string>;
  isBookmarked: boolean = false;
  constructor(private route: ActivatedRoute, private forumService: ForumService,private reportService:ContentReportService ) { 
 
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log("idParam", idParam);
    
    if (idParam !== null && idParam !== undefined && !isNaN(+idParam)) {
      this.forumId = +idParam;
      console.log(this.forumId); // Output: 2
      this.forumService.getForum(this.forumId).subscribe((res) => {
        this.forumPost = res;
        this.isBookmarked = res.bookmarked;
        console.log(" post ", this.forumPost);
        
        // Extract unique tags from forumPost
        this.extractUniqueTags();
      });
    } else {
      console.error('Invalid forum ID');
    }
    
   
  }
  deleteComment(comment:any){
console.log("comment deleted ",comment);
  }
  bookmarkPost(postId: any) {
    console.log("post id",postId);
    
    this.forumService.saveAsStarred(postId).subscribe(res=>{
      console.log("res",res);
      this.isBookmarked = res.bookmarked;
      window.location.reload();
    })
  }
  
  extractUniqueTags(): void {
    this.uniqueTags = new Set<string>();
    console.log("I am out ", this.allReport);
    
    this.reportService.getContentReportByLink(window.location.href).subscribe((res) => {
      this.allReport = res;
      
      if (this.allReport && this.allReport.contentDto) {
        console.log("I am in ");
  
        this.allReport.contentDto.forEach((content: { tags: any[]; reportedAt: string | Date; }) => {
          console.log("Content ", content);
          
          if (content?.tags) {
            content.tags.forEach(tag => {
              this.uniqueTags.add(tag.toLowerCase()); // Convert to lowercase to ensure case-insensitivity
            });
          }
  
          // Convert reportedAt to Date object
          if (typeof content.reportedAt === 'string') {
            console.log("content.reportedAt ");
            const parsedDate = new Date(content.reportedAt);
            console.log("content.reportedAt 1 ",content.reportedAt );
            if (!isNaN(parsedDate.getTime())) {
              // Conversion successful, update reportedAt
              content.reportedAt = parsedDate;
              console.log("content.reportedAt ",content.reportedAt );
              
            } else {
              // Handle invalid date format
              console.error('Invalid date format:', content.reportedAt);
              // Implement fallback mechanism or display error message
            }
          }
        });
        console.log("all tags ", this.uniqueTags);
      }
      
      // Update allReport with updated contentDto
      this.allReport.contentDto = this.allReport.contentDto.map((content: { reportedAt: string | Date; }) => {
        // Convert reportedAt to Date object
        if (typeof content.reportedAt === 'string') {
          const parsedDate = new Date(content.reportedAt);
          if (!isNaN(parsedDate.getTime())) {
            // Conversion successful, update reportedAt
            content.reportedAt = parsedDate;
          } else {
            // Handle invalid date format
            console.error('Invalid date format:', content.reportedAt);
            // Implement fallback mechanism or display error message
          }
        }
        return content;
      });
    });
  }
  
  
  
  

}

