import { Component, Input, OnInit } from '@angular/core';
import { tap, catchError } from 'rxjs';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserData } from 'src/app/services/user/interfaces/user-data';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-userinfo-info',
  templateUrl: './userinfo-info.component.html',
  styleUrls: ['./userinfo-info.component.scss']
})
export class UserinfoInfoComponent implements OnInit {

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
