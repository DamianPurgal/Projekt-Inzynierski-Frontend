import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessage } from './interfaces/notification-message';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  displayNotification(notification: NotificationMessage) {
    this.snackBar.open(
      notification.message,
      'OK',
      {
        duration: 3000,
        panelClass: 'snackbar',
        horizontalPosition: "right",
        verticalPosition: "top"
      }
    );
  }
}
