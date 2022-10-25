import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { JwtAuthService } from 'src/app/services/authentication/jwt-auth.service';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-userinfo-delete',
  templateUrl: './userinfo-delete.component.html',
  styleUrls: ['./userinfo-delete.component.scss']
})
export class UserinfoDeleteComponent implements OnInit {

  constructor(
    private userService : UserService,
    private notificationService: NotificationService,
    private router: Router,
    private authService: JwtAuthService
    ) { }

  isLoading: boolean = false;

  ngOnInit(): void {
  }

  deleteLoggedUserAccount() {
    this.isLoading = true;
    this.userService.deleteLoggedUserAccount()
    .pipe(
      tap(() => (this.isLoading = false)),
      catchError((error) => {
        this.isLoading = false;
        this.notificationService.displayNotification(
          {
            message: error.error.message
          },
          NotificationType.WARNING
        );
        throw new Error("Delete user account error");
      })
    ).subscribe(Response =>
      {
        this.authService.logoutUser();
        this.router.navigate(['/']);
        this.notificationService.displayNotification(
          {
            message: "User account deleted"
          },
          NotificationType.INFO
        );
    });
  }

}
