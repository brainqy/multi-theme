import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService } from 'src/app/Core/services/forum.service';
import { HelloService } from 'src/app/Core/services/hello.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit{
  forumPosts: any = [];
  sideNavStatus:boolean=false;
  currentPagePosts: any[] = [];
  currentPage = 0;
  totalPages = 1;
  pageSize = 6; // Number of posts per page
  pages: number[] = [];
  constructor( private helloService:HelloService, private router:Router){

  }
  ngOnInit(): void {
    this.loadForumPosts();
  }
  loadForumPosts(): void {
    this.helloService.getHello().subscribe((res: any) => {
      console.log("res",res);
      
      this.forumPosts = res;
      this.totalPages = Math.ceil(this.forumPosts.length / this.pageSize);
      this.generatePageNumbers();
      this.setCurrentPagePosts();
    });
  }

  setCurrentPagePosts(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentPagePosts = this.forumPosts.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.setCurrentPagePosts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.setCurrentPagePosts();
    }
  }
  generatePageNumbers(): void {
    this.pages = [];
    const maxPagesToShow = 5;
    let startPage: number;
    let endPage: number;
  
    if (this.totalPages <= maxPagesToShow) {
      // If total pages is less than or equal to max pages to show, display all pages
      startPage = 0;
      endPage = this.totalPages - 1;
    } else {
      // Calculate start and end pages based on current page
      const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
      if (this.currentPage <= halfMaxPagesToShow) {
        // If current page is near the beginning, display first few pages
        startPage = 0;
        endPage = maxPagesToShow - 1;
      } else if (this.currentPage >= this.totalPages - halfMaxPagesToShow) {
        // If current page is near the end, display last few pages
        startPage = this.totalPages - maxPagesToShow;
        endPage = this.totalPages - 1;
      } else {
        // Otherwise, display pages centered around current page
        startPage = this.currentPage - halfMaxPagesToShow;
        endPage = this.currentPage + halfMaxPagesToShow;
      }
    }
  
    // Generate the range of page numbers to display
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  // Other methods...

  goToPage(page: number): void {
    this.currentPage = page;
    this.setCurrentPagePosts();
  }

  openPost(postId: number): void {
    this.router.navigate(['/blog/post', postId]);
  }

}
