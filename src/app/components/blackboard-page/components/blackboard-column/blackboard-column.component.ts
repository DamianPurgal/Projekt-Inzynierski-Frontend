import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap, catchError } from 'rxjs';
import { AddTicketComponent } from 'src/app/components/dialogs/add-ticket/add-ticket.component';
import { DeleteColumnComponent } from 'src/app/components/dialogs/delete-column/delete-column.component';
import { EditColumnComponent } from 'src/app/components/dialogs/edit-column/edit-column.component';
import { ColumnService } from 'src/app/services/column/column.service';
import { ColumnDto } from 'src/app/services/column/interfaces/column-dto';
import { ColumnEditDto } from 'src/app/services/column/interfaces/column-edit-dto';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TicketAddDto } from 'src/app/services/ticket/interfaces/ticket-add-dto';
import { TicketDto } from 'src/app/services/ticket/interfaces/ticket-dto';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { AddTicketEmitMessage } from '../../interfaces/add-ticket-dto';

@Component({
  selector: 'app-blackboard-column',
  templateUrl: './blackboard-column.component.html',
  styleUrls: ['./blackboard-column.component.scss']
})
export class BlackboardColumnComponent implements OnInit {

  @Input() column!: ColumnDto;

  @Input() blackboardUUID!: string;

  @Output() deleteColumnEvent = new EventEmitter<string>();

  @Output() addTicketEvent = new EventEmitter<AddTicketEmitMessage>();

  isLoading: boolean = false;

  constructor(
    private ticketService: TicketService,
    private columnService: ColumnService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<TicketDto[]>) {
    this.changeTicketPosition(
      event.previousContainer.id,
      event.container.id,
      event.previousContainer.data[event.previousIndex].uuid,
      event.currentIndex,
      );
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  }

  private changeTicketPosition(columnUUID : string, newColumnUUID : string, ticketUUID : string, newPosition : number) {
    this.ticketService.changeTicketPosition(
      this.blackboardUUID,
      columnUUID,
      ticketUUID,
      newPosition,
      newColumnUUID
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
          throw new Error("Error while changing ticket position");
        })
      ).subscribe(Response =>
        {
          this.notificationService.displayNotification(
            {
              message: "Ticket position changed",
            },
            NotificationType.INFO
          );
      });
  }

  openTicketAddDialog() {
    const dialogRef = this.dialog.open(AddTicketComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const ticketToAdd: TicketAddDto = {
        color: result.color,
        description: result.description,
        name: result.name
      }
      if (result.canceled) {
        return;
      }

      this.addTicket(ticketToAdd);
    });
  }

  private addTicket(ticket : TicketAddDto) {
    this.isLoading = true;

    this.addTicketEvent.emit({column: this.column, ticket})
  }

  deleteTicket(ticketUUID: string) {
    this.column.tickets.forEach( (ticket, index) => {
      if (ticket.uuid === ticketUUID) {
        this.column.tickets.splice(index, 1)
      }
    });
  }

  openColumnEditDialog() {
    const dialogRef = this.dialog.open(EditColumnComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const columnToEdit: ColumnEditDto = {
        color: result.color,
        name: result.name
      }
      if (result.canceled) {
        return;
      }

      this.editColumn(columnToEdit);
    });
  }

  private editColumn(column : ColumnEditDto) {
    this.isLoading = true;

    this.columnService.editColumn(column, this.blackboardUUID, this.column.uuid)
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
        throw new Error("Column edit error");
      })
    ).subscribe(Response =>
      {
        this.notificationService.displayNotification(
          {
            message: "Column edited"
          },
          NotificationType.INFO
        );
        this.column.color = Response.color;
        this.column.name = Response.name;
    });
  }

  openColumnDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteColumnComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result.deleteColumn) {
        return;
      }

      this.columnService.deleteColumn(this.blackboardUUID, this.column.uuid)
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
          throw new Error("Error while deleting column");
        })
      ).subscribe(Response =>
        {
          this.notificationService.displayNotification(
            {
              message: "Column successfully deleted",
            },
            NotificationType.INFO
          );
          this.deleteColumnEvent.emit(this.column.uuid);
      });

    });
  }

}
