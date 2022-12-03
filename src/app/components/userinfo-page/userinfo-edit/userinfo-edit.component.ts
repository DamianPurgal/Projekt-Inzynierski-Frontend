import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { EditUserData } from 'src/app/services/user/interfaces/edit-user-data';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-userinfo-edit',
  templateUrl: './userinfo-edit.component.html',
  styleUrls: ['./userinfo-edit.component.scss']
})
export class UserinfoEditComponent implements OnInit {

  @ViewChild('oldPasswordInput')
  private oldPasswordInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('newPasswordInput')
  private newPasswordInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('firstnameInput')
  private firstnameInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('lastnameInput')
  private lastnameInputElement!: ElementRef<HTMLInputElement>;

  editUserForm!: FormGroup;

  isLoading: boolean = false;

  constructor(private userService : UserService, private notificationService: NotificationService, private router: Router) {
    this.editUserForm = new FormGroup({
      'oldPassword' : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      'newPassword' : new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      'firstname' : new FormControl(null, [Validators.required, Validators.minLength(1)]),
      'lastname' : new FormControl(null, [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
  }

  editLoggedUserData() {
    var editUserDataDto : EditUserData = {
      newPassword: this.newPasswordInputElement.nativeElement.value,
      oldPassword: this.oldPasswordInputElement.nativeElement.value,
      firstname: this.firstnameInputElement.nativeElement.value,
      lastname: this.lastnameInputElement.nativeElement.value
    }

    this.isLoading = true;

    this.userService.editLoggedUserData(editUserDataDto)
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
        throw new Error("Edit user data error");
      })
    ).subscribe(Response =>
      {
        this.router.navigate(['/user/info']);
        this.notificationService.displayNotification(
          {
            message: "User data saved"
          },
          NotificationType.INFO
        );
    });
  }

}
