import {Component} from '@angular/core';
import {UsersService} from "../../../Core/services/users.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tm-home',
  templateUrl: './tm-home.component.html',
  styleUrls: ['./tm-home.component.css']
})
export class TmHomeComponent {

  sideNavStatus: boolean = false;
  userDetails: any = [];
  status: boolean = false;

  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllPendingUsers();
  }

  getAllPendingUsers() {
    this.usersService.getAllPendingUsers().subscribe(res => {
      this.userDetails = res;
    })
  }

  approveUser(user: any) {
    this.usersService.approvePendingUser(user.emailAdd).subscribe(res => {
      this.status = res;
    })
    window.location.reload();
  }

  declineUser(user: any) {
    this.usersService.declinePendingUser(user.emailAdd).subscribe(res => {
        this.status = res;
        if (this.status) {
          Swal.fire('Success', "User Decline Successfully !", 'success');
          this.router.navigate(['']);
        } else {
          Swal.fire('Failed', "User Decline Failed !", 'error');
          this.router.navigate(['']);
        }
      },
      error => {
        Swal.fire('Failed', "Something went wrong !", 'error');
      });
  }
}
