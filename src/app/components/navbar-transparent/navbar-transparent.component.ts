import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthService } from 'src/app/services/authentication/jwt-auth.service';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-navbar-transparent',
  templateUrl: './navbar-transparent.component.html',
  styleUrls: ['./navbar-transparent.component.scss']
})
export class NavbarTransparentComponent implements OnInit {

  isUserLogged: boolean = false;

  constructor(private jwtAuthService: JwtAuthService, private router: Router, private notificationService: NotificationService) {
    router.events.subscribe(() => {
      this.isUserLogged = jwtAuthService.isUserLogged();
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.jwtAuthService.logoutUser();
    this.isUserLogged=false;
    this.router.navigate(['']);
    this.notificationService.displayNotification(
      {
        message: "Logged out"
      },
      NotificationType.INFO
    );
  }

}
