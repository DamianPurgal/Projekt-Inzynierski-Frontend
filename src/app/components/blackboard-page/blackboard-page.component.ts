import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs';
import { BlackboardService } from 'src/app/services/blackboard/blackboard.service';
import { BlackboardDetailedDto } from 'src/app/services/blackboard/interfaces/blackboard-detailed-dto';
import { BlackboardInfo } from 'src/app/services/blackboard/interfaces/blackboard-info';
import { ColumnService } from 'src/app/services/column/column.service';
import { ColumnDto } from 'src/app/services/column/interfaces/column-dto';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-blackboard-page',
  templateUrl: './blackboard-page.component.html',
  styleUrls: ['./blackboard-page.component.scss']
})
export class BlackboardPageComponent implements OnInit {

  linkUUID: string;
  isLoading: boolean = false;
  blackboard!: BlackboardInfo;
  blackboardDetailed!: BlackboardDetailedDto;

  constructor(
    private blackboardService: BlackboardService,
    private columnService: ColumnService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private route : ActivatedRoute,
    private router: Router
    ) {
    this.linkUUID = this.route.snapshot.paramMap.get('uuid') ?? '';
    this.getBlackboardDetailedData();
  }

  ngOnInit(): void { }

  private getBlackboardDetailedData() {
    this.blackboardService.getBlackboardDetailed(this.linkUUID)
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
          throw new Error("Error while fetching blackboard data");
        })
      ).subscribe(Response =>
        {
          this.blackboardDetailed = Response;
          this.blackboard = {
            uuid: Response.uuid,
            name: Response.name,
            description: Response.description,
            color: Response.color,
            role: Response.role
          }
          this.notificationService.displayNotification(
            {
              message: "Blackboard loaded",
            },
            NotificationType.INFO
          );
      });
  }

  addColumn(column: ColumnDto) {
    this.blackboardDetailed.columns.push(column);
  }

  deleteColumn(columnUUID: string) {
    this.blackboardDetailed.columns.forEach( (column, index) => {
      if (column.uuid === columnUUID) {
        this.blackboardDetailed.columns.splice(index,1)
      }
    });
  }

  drop(event: CdkDragDrop<ColumnDto[]>) {
    if (event.previousContainer === event.container) {
      if (event.previousIndex !== event.currentIndex) {
        this.changeColumnPosition(event.previousContainer.data[event.previousIndex], event.currentIndex);
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  private changeColumnPosition(column : ColumnDto, newPosition : number) {
    this.columnService.changeColumnPosition(this.blackboard.uuid, column.uuid, newPosition)
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
          throw new Error("Error while changing column position");
        })
      ).subscribe(Response =>
        {
          this.notificationService.displayNotification(
            {
              message: "Column position changed",
            },
            NotificationType.INFO
          );
      });
  }
}
