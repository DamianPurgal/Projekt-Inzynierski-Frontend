import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap, catchError } from 'rxjs';
import { AddBlackboardContributorComponent } from 'src/app/components/dialogs/add-blackboard-contributor/add-blackboard-contributor.component';
import { BlackboardService } from 'src/app/services/blackboard/blackboard.service';
import { BlackboardContributorAddDto } from 'src/app/services/blackboard/interfaces/blackboard-contributor-add-dto';
import { BlackboardInfo } from 'src/app/services/blackboard/interfaces/blackboard-info';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-blackboard',
  templateUrl: './blackboard.component.html',
  styleUrls: ['./blackboard.component.scss']
})
export class BlackboardComponent implements OnInit {

  constructor(
    private blackboardService: BlackboardService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) { }

  @Input() blackboard!: BlackboardInfo;
  isLoading: boolean = false;

  ngOnInit(): void {
  }

  tryToAddBlackboardContributor() {
    this.openBlackboardContributorDialog();
  }

  private openBlackboardContributorDialog() {
    const dialogRef = this.dialog.open(AddBlackboardContributorComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const blackboardContributorToAdd: BlackboardContributorAddDto = {
        blackboardUUID: this.blackboard.uuid,
        contributor: result.contributorEmail
      }
      if (result.canceled) {
        return;
      }

      this.blackboardService.addBlackboardContributor(blackboardContributorToAdd)
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
          throw new Error("Error while add new blackboard contributor");
        })
      ).subscribe(Response =>
        {
          this.notificationService.displayNotification(
            {
              message: "Contributor successfully added",
            },
            NotificationType.INFO
          );
      });
    });
  }

}
