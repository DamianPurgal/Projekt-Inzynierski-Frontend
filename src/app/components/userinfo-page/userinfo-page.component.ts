import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserData } from 'src/app/services/user/interfaces/user-data';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-userinfo-page',
  templateUrl: './userinfo-page.component.html',
  styleUrls: ['./userinfo-page.component.scss']
})
export class UserinfoPageComponent implements OnInit {

  constructor(private userService : UserService, private notificationService: NotificationService) { }

  isLoading: boolean = false;

  userData: UserData = {
    email: "",
    firstname: "",
    lastname: ""
  };

  ngOnInit(): void {
    this.getLoggedUserData();
  }

  getLoggedUserData() {
    this.isLoading = true;
    this.userService.getLoggedUserInfo()
    .pipe(
        tap(() => (this.isLoading = false)),
        catchError((error) => {
          this.isLoading = false;
          this.notificationService.displayNotification(
            {
              message: "Error loading data. Try again later",
            },
            NotificationType.WARNING
          );
          throw new Error("User data loading error");
        })
      ).subscribe(Response =>
        {
          console.log(this.userData);
          this.userData = Response;
      });
  }

}
