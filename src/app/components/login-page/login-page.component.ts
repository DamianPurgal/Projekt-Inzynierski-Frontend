import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';
import { JwtToken } from 'src/app/services/authentication/interfaces/jwt-token';
import { JwtAuthService } from 'src/app/services/authentication/jwt-auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-5%)', opacity: 0}),
          animate('120ms', style({transform: 'translateY(0)', opacity: 1}))
        ])
      ]
      )
    ]
})
export class LoginPageComponent implements OnInit {

  @ViewChild('usernameInput')
  private usernameInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('passwordInput')
  private passwordInputelement!: ElementRef<HTMLInputElement>;

  private jwtToken!: Observable<JwtToken>;

  passwordHide = true;

  isLoading: boolean = false;

  constructor(private jwtAuthService: JwtAuthService, private notificationService: NotificationService, private router: Router) { }

  login() {
    this.isLoading = true;
    this.jwtAuthService.authenticate(
      this.usernameInputElement.nativeElement.value,
      this.passwordInputelement.nativeElement.value
      ).pipe(
        tap(() => (this.isLoading = false)),
        catchError((error) => {
          this.isLoading = false;
          this.notificationService.displayNotification(
            {
              message: "Authentication failed. Wrong username or password!"
            }
          );
          throw new Error("Auth error");
        })
      ).subscribe(Response =>
        {
          console.log(Response);
          this.router.navigate(['']);
          this.notificationService.displayNotification(
            {
              message: "Logged in"
            }
          );
      });
  }

  ngOnInit(): void {
  }

}
