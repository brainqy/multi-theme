import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from 'src/app/Core/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  forumPost: ForumPost | undefined;

  constructor(private route: ActivatedRoute, private forumService: ForumService) { }

  ngOnInit(): void {
    const postId = +this.route.snapshot.paramMap.get('id')!;
    this.forumPost = this.forumService.getForumPostById(postId);
  }

}
export interface ForumPost {
  id: number;
  title: string;
  content: string;
  // Other properties as needed
}
