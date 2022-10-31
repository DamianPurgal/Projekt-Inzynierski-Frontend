import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, tap } from 'rxjs';
import { BlackboardService } from 'src/app/services/blackboard/blackboard.service';
import { BlackboardAdd } from 'src/app/services/blackboard/interfaces/blackboard-add';
import { BlackboardInfo } from 'src/app/services/blackboard/interfaces/blackboard-info';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AddBlackboardComponent } from './components/add-blackboard/add-blackboard.component';

@Component({
  selector: 'app-blackboard-list-page',
  templateUrl: './blackboard-list-page.component.html',
  styleUrls: ['./blackboard-list-page.component.scss'],
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
export class BlackboardListPageComponent implements OnInit {

  constructor(
    private blackboardService: BlackboardService,
    private notificationService: NotificationService,
    public dialog: MatDialog
    ) { }

  blackboards: BlackboardInfo[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getAllBlackboardsOfUser();
  }

  getAllBlackboardsOfUser() {
    this.isLoading = true;
    this.blackboardService.getAllBlackboardsOfUser()
    .pipe(
      tap(() => (this.isLoading = false)),
      catchError((error) => {
        this.isLoading = false;
        this.notificationService.displayNotification(
          {
            message: "Error loading data. Try again later",
          },
          NotificationType.WARNING
        );
        throw new Error("Blackboards list loading error");
      })
    ).subscribe(Response =>
      {
        this.blackboards = Response;
    });
  }

  tryToAddBlackboard() {
    this.openBlackboardDialog();
  }

  private openBlackboardDialog() {
    const dialogRef = this.dialog.open(AddBlackboardComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addBlackboard(result);
    });
  }

  private addBlackboard(blackboard : BlackboardAdd) {
    this.isLoading = true;

    this.blackboardService.addBlackboard(blackboard)
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
        throw new Error("Blackboard add error");
      })
    ).subscribe(Response =>
      {
        this.blackboards.push(Response);
        this.notificationService.displayNotification(
          {
            message: "Blackboard created"
          },
          NotificationType.INFO
        );
    });

  }
}
