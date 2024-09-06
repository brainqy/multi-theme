import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentReportService } from 'src/app/Core/services/content-report.service';
import { ForumService } from 'src/app/Core/services/forum.service';
import { HelloService } from 'src/app/Core/services/hello.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent {
  
  sideNavStatus:boolean=false;
  forumPost: any;
  forumId!: number;
  allReport!: any;
  uniqueTags!: Set<string>;
 
  constructor(private route: ActivatedRoute, private helloService: HelloService,private reportService:ContentReportService ) { 
  }
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log("idParam", idParam);
    
    if (idParam !== null && idParam !== undefined && !isNaN(+idParam)) {
      this.forumId = +idParam;
      console.log(this.forumId); // Output: 2
      this.helloService.getForum(this.forumId).subscribe((res) => {
        this.forumPost = res;
        console.log(" post ", this.forumPost);
        
        // Extract unique tags from forumPost
      });
    } else {
      console.error('Invalid forum ID');
    }
    
   
  }

}
