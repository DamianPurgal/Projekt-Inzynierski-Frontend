import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap, catchError } from 'rxjs';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TicketDetailedDto } from 'src/app/services/ticket/interfaces/ticket-detailed-dto';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { TicketInfo } from './interfaces/ticket-info';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent implements OnInit {

  isLoading: boolean = false;
  ticket!: TicketDetailedDto;

  constructor(
    public reference: MatDialogRef<TicketDialogComponent>,
    private ticketService : TicketService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public ticketInfo: TicketInfo,
  ) {
    reference.disableClose = false;
    this.getTicketInformation();
  }

  ngOnInit(): void {

  }

  closeDialog() {
    this.reference.close();
  }

  getTicketInformation() {
    this.ticketService.getTicketDetailed(
      this.ticketInfo.blackboardUUID,
      this.ticketInfo.columnUUID,
      this.ticketInfo.ticketUUID
    )
    .pipe(
      tap(() => (this.isLoading = false)),
      catchError((error) => {
        this.isLoading = false;
        this.notificationService.displayNotification(
          {
            message: error.error.message,
          },
          NotificationType.WARNING
        );
        throw new Error("Error while loading ticket information");
      })
    ).subscribe(Response =>
      {
        Response.comments.forEach((comment) => {
          comment.date = new Date(comment.date);
        });
        this.ticket = Response;
        this.notificationService.displayNotification(
          {
            message: "Ticket information loaded",
          },
          NotificationType.INFO
        );
    });
}

}
