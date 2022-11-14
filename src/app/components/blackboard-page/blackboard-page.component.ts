import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs';
import { BlackboardService } from 'src/app/services/blackboard/blackboard.service';
import { BlackboardDeleteDto } from 'src/app/services/blackboard/interfaces/blackboard-delete-dto';
import { BlackboardDetailedDto } from 'src/app/services/blackboard/interfaces/blackboard-detailed-dto';
import { BlackboardEditDto } from 'src/app/services/blackboard/interfaces/blackboard-edit-dto';
import { BlackboardInfo } from 'src/app/services/blackboard/interfaces/blackboard-info';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BlackboardContributorsComponent } from '../dialogs/blackboard-contributors/blackboard-contributors.component';
import { DeleteBlackboardComponent } from '../dialogs/delete-blackboard/delete-blackboard.component';
import { EditBlackboardComponent } from '../dialogs/edit-blackboard/edit-blackboard.component';

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

}
