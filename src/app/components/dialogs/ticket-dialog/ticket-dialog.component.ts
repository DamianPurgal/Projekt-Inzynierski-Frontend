import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap, catchError } from 'rxjs';
import { ContributorService } from 'src/app/services/contributor/contributor.service';
import { ContributorDto } from 'src/app/services/contributor/interfaces/contributor-dto';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TicketDetailedDto } from 'src/app/services/ticket/interfaces/ticket-detailed-dto';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { UserData } from 'src/app/services/user/interfaces/user-data';
import { TicketInfo } from './interfaces/ticket-info';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent implements OnInit {

  isLoading: boolean = false;
  ticket!: TicketDetailedDto;
  contributors: ContributorDto[] = [];

  constructor(
    public reference: MatDialogRef<TicketDialogComponent>,
    private ticketService : TicketService,
    private contributorService : ContributorService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public ticketInfo: TicketInfo,
  ) {
    reference.disableClose = true;
    this.getTicketInformation();
  }

  ngOnInit(): void {

  }

  closeDialog() {
    this.reference.close(this.ticket);
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

  getContributors() {
    this.contributorService.getAllContributors(
      this.ticketInfo.blackboardUUID
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
        throw new Error("Error while loading contributors");
      })
    ).subscribe(Response =>
      {
        this.contributors = Response;
        this.notificationService.displayNotification(
          {
            message: "Contributors information loaded",
          },
          NotificationType.INFO
        );
    });
  }

  addTicketContributor(email : string) {
    this.ticketService.assignUserToTicket(
      this.ticketInfo.blackboardUUID,
      this.ticketInfo.columnUUID,
      this.ticketInfo.ticketUUID,
      email
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
        throw new Error("Error while assign user to ticket");
      })
    ).subscribe(Response =>
      {
        this.ticket.user = Response.user;
        this.notificationService.displayNotification(
          {
            message: "User assigned to ticket",
          },
          NotificationType.INFO
        );
    });
  }

  removeTicketContributor() {
this.ticketService.removeUserAssigmentToTicket(
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
        throw new Error("Error while removing assigment of ticket");
      })
    ).subscribe(Response =>
      {
        this.ticket.user = Response.user;
        this.notificationService.displayNotification(
          {
            message: "User unasigned",
          },
          NotificationType.INFO
        );
    });
  }

}
