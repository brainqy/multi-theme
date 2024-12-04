import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForumService } from 'src/app/Core/services/forum.service';

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.scss']
})
export class CreateForumComponent {
  sideNavStatus:boolean=false;
  editorContent: string = '';
  newPostForm: FormGroup;
  selectedPostType: 'forum' | 'blog' = 'forum'; // Default to 'forum'

  constructor(private forumService: ForumService, private fb: FormBuilder, private router:Router) {
    this.newPostForm = this.fb.group({
      forum_title: ['', Validators.required],
      forum_body: ['', Validators.required], // Assuming forum_body is required
      blog_tags: [''] // Optional for blog posts
    });
  }
  setPostType(type: 'forum' | 'blog') {
    this.selectedPostType = type;
    if (type === 'forum') {
      this.newPostForm.get('blog_tags')?.disable();
    } else {
      this.newPostForm.get('blog_tags')?.enable();
    }
  }
  onSubmit() {
    if (this.newPostForm.valid) {
      const postData = {
        type: this.selectedPostType,
        ...this.newPostForm.value
      };
      console.log('New post:', postData);
      this.forumService.createForum(postData).subscribe((res) => {
        console.log("response after obs",res);
        this.router.navigateByUrl("/forum-list");
        // Handle success or other logic
      });
    } else {
      // Handle form validation errors
    }
  }
}
