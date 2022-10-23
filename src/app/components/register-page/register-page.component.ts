import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs';
import { UserRegistrationDto } from 'src/app/services/authentication/interfaces/user-registration-dto';
import { JwtAuthService } from 'src/app/services/authentication/jwt-auth.service';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(private jwtAuthService: JwtAuthService, private notificationService: NotificationService, private router: Router) { }

  @ViewChild('usernameInput')
  private usernameInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('passwordInput')
  private passwordInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('firstnameInput')
  private firstnameInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('lastnameInput')
  private lastnameInputElement!: ElementRef<HTMLInputElement>;

  registerForm!: FormGroup;

  isLoading: boolean = false;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      'firstname' : new FormControl(null, [Validators.required, Validators.minLength(1)]),
      'lastname' : new FormControl(null, [Validators.required, Validators.minLength(1)]),
    });
  }

  registerUser() {
    var userRegistrationDto : UserRegistrationDto = {
      email: this.usernameInputElement.nativeElement.value,
      firstname: this.firstnameInputElement.nativeElement.value,
      lastname: this.lastnameInputElement.nativeElement.value,
      password: this.passwordInputElement.nativeElement.value
    }

    this.isLoading = true;

    this.jwtAuthService.registerUser(
        userRegistrationDto
      ).pipe(
        tap(() => (this.isLoading = false)),
        catchError((error) => {
          this.isLoading = false;
          this.notificationService.displayNotification(
            {
              message: error.error.message
            },
            NotificationType.WARNING
          );
          throw new Error("Registration error");
        })
      ).subscribe(Response =>
        {
          this.router.navigate(['/login']);
          this.notificationService.displayNotification(
            {
              message: "Account created"
            },
            NotificationType.INFO
          );
      });
  }

}
