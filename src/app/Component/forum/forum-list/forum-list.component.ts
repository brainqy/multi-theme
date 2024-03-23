import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from 'src/app/Core/services/forum.service';
import { ForumPost } from '../forum/forum.component';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent {
  forumPosts: ForumPost[] = [];

  constructor(private forumService: ForumService, private router: Router) { }

  ngOnInit(): void {
    this.forumPosts = this.forumService.getForumPosts();
  }

  openPost(postId: number): void {
    this.router.navigate(['/forum', postId]);
  }

}
