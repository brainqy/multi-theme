import { Injectable } from '@angular/core';
import { ForumPost } from 'src/app/Component/forum/forum/forum.component';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private forumPosts: ForumPost[] = [
    { id: 1, title: 'Post 1', content: 'Content of Post 1' },
    { id: 2, title: 'Post 2', content: 'Content of Post 2' },
    // Add more forum posts
  ];

  constructor() { }

  getForumPosts(): ForumPost[] {
    return this.forumPosts;
  }

  getForumPostById(id: number): ForumPost | undefined {
    return this.forumPosts.find(post => post.id === id);
  }
}
