import { Component } from '@angular/core';
import { ForumService } from 'src/app/Core/services/forum.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent {
  bookmarks: any;
  constructor(private forumService : ForumService){
    this.loadBookmarked();
  }
  loadBookmarked(){
this.forumService.getBookmarkedPosts().subscribe(res=>{
  console.log("res",res);
  this.bookmarks = res;
  
})
  }

  removeBookmark(bookmarkId: number): void {
  }
}
