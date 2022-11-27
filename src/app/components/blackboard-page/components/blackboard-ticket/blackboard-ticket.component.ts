import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap, catchError } from 'rxjs';
import { DeleteTicketComponent } from 'src/app/components/dialogs/delete-ticket/delete-ticket.component';
import { EditTicketComponent } from 'src/app/components/dialogs/edit-ticket/edit-ticket.component';
import { TicketDialogComponent } from 'src/app/components/dialogs/ticket-dialog/ticket-dialog.component';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TicketDto } from 'src/app/services/ticket/interfaces/ticket-dto';
import { TicketEditDto } from 'src/app/services/ticket/interfaces/ticket-edit-dto';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-blackboard-ticket',
  templateUrl: './blackboard-ticket.component.html',
  styleUrls: ['./blackboard-ticket.component.scss']
})
export class BlackboardTicketComponent implements OnInit {

  @Input() ticket!: TicketDto;
  @Input() blackboardUUID!: string;
  @Input() columnUUID!: string;
  @Output() deleteTicketEvent = new EventEmitter<string>();

  isLoading: boolean = false;

  constructor(
    private ticketService: TicketService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openTicketEditDialog() {
    const dialogRef = this.dialog.open(EditTicketComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const ticketToEdit: TicketEditDto = {
        color: result.color,
        description: result.description,
        name: result.name
      }
      if (result.canceled) {
        return;
      }

      this.editTicket(ticketToEdit);
    });
  }

  openTicketDetailedDialog() {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '600px',
      data: {
        blackboardUUID : this.blackboardUUID,
        columnUUID : this.columnUUID,
        ticketUUID : this.ticket.uuid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ticket.user = result.user;
    });
  }

  private editTicket(ticket : TicketEditDto) {
    this.isLoading = true;

    this.ticketService.editTicket(ticket, this.blackboardUUID, this.columnUUID, this.ticket.uuid)
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
        throw new Error("Ticket edit error");
      })
    ).subscribe(Response =>
      {
        this.ticket.color = Response.color;
        this.ticket.description = Response.description;
        this.ticket.name = Response.name;
        this.ticket.uuid = Response.uuid;
        this.ticket.position = Response.position;

        this.notificationService.displayNotification(
          {
            message: "Ticket edited"
          },
          NotificationType.INFO
        );
    });
  }

  openTicketDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteTicketComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result.deleteTicket) {
        return;
      }

      this.ticketService.deleteTicket(this.blackboardUUID, this.columnUUID, this.ticket.uuid)
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
          throw new Error("Error while deleting ticket");
        })
      ).subscribe(Response =>
        {
          this.notificationService.displayNotification(
            {
              message: "Ticket successfully deleted",
            },
            NotificationType.INFO
          );
          this.deleteTicketEvent.emit(this.ticket.uuid);
      });

    });
  }

}
