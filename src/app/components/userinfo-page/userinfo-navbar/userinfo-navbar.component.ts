import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthService } from 'src/app/services/authentication/jwt-auth.service';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-userinfo-navbar',
  templateUrl: './userinfo-navbar.component.html',
  styleUrls: ['./userinfo-navbar.component.scss']
})
export class UserinfoNavbarComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private authService: JwtAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['']);
    this.notificationService.displayNotification(
      {
        message: "Logged out"
      },
      NotificationType.INFO
    );
  }

}
