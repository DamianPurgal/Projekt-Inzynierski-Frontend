import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationType } from './enums/notification-type';
import { NotificationMessage } from './interfaces/notification-message';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  displayNotification(notification: NotificationMessage, type : NotificationType) {
    var style = 'snackbar';
    if (type === NotificationType.WARNING) {
      style = 'notification-error';
    }

    this.snackBar.open(
      notification.message,
      'OK',
      {
        duration: 3000,
        panelClass: [style, 'notification-margin'],
        horizontalPosition: "right",
        verticalPosition: "top",
      }
    );
  }
}
