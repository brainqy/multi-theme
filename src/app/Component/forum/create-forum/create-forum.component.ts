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

  constructor(private forumService: ForumService, private fb: FormBuilder, private router:Router) {
    this.newPostForm = this.fb.group({
      forum_title: ['', Validators.required],
      forum_body: ['', Validators.required] // Assuming forum_body is required
    });
  }

  onSubmit() {
    if (this.newPostForm.valid) {
      console.log('New post:', this.newPostForm.value);
      this.forumService.createForum(this.newPostForm.value).subscribe((res) => {
        console.log("response",res);
        this.router.navigateByUrl("/forum-list");
        // Handle success or other logic
      });
    } else {
      // Handle form validation errors
    }
  }
}
