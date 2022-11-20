import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs';
import { BlackboardContributorsComponent } from 'src/app/components/dialogs/blackboard-contributors/blackboard-contributors.component';
import { DeleteBlackboardComponent } from 'src/app/components/dialogs/delete-blackboard/delete-blackboard.component';
import { EditBlackboardComponent } from 'src/app/components/dialogs/edit-blackboard/edit-blackboard.component';
import { BlackboardService } from 'src/app/services/blackboard/blackboard.service';
import { BlackboardDeleteDto } from 'src/app/services/blackboard/interfaces/blackboard-delete-dto';
import { BlackboardEditDto } from 'src/app/services/blackboard/interfaces/blackboard-edit-dto';
import { BlackboardInfo } from 'src/app/services/blackboard/interfaces/blackboard-info';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-blackboard-navbar',
  templateUrl: './blackboard-navbar.component.html',
  styleUrls: ['./blackboard-navbar.component.scss']
})
export class BlackboardNavbarComponent implements OnInit {

  constructor(
    private blackboardService: BlackboardService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.blackboard = {
      color: '',
      description: '',
      role: '',
      name: '',
      uuid: ''
    }
  }

  @Input() blackboard!: BlackboardInfo;
  isLoading: boolean = false;

  tryToDeleteBlackboard() {
    this.openBlackboardDeleteDialog();
  }

  private openBlackboardDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteBlackboardComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const blackboardToDelete: BlackboardDeleteDto = {
        blackboardUUID: this.blackboard.uuid
      }

      if (!result.deleteBlackboard) {
        return;
      }

      this.blackboardService.deleteBlackboard(blackboardToDelete)
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
          throw new Error("Error while deleting blackboard");
        })
      ).subscribe(Response =>
        {
          this.notificationService.displayNotification(
            {
              message: "Blackboard successfully deleted",
            },
            NotificationType.INFO
          );
          this.router.navigate(['/blackboards']);
      });

    });
  }

  tryToEditBlackboard() {
    this.openBlackboardEditDialog();
  }

  private openBlackboardEditDialog() {
    const dialogRef = this.dialog.open(EditBlackboardComponent, {
      width: '400px',
      data: this.blackboard
    });

    dialogRef.afterClosed().subscribe(result => {
      const blackboardEditDto: BlackboardEditDto = {
        name: result.name,
        description: result.description,
        color: result.color
      }

    if (result.canceled) {
      return;
    }

    this.blackboardService.editBlackboard(blackboardEditDto, this.blackboard.uuid)
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
          throw new Error("Error while editing blackboard");
        })
      ).subscribe(Response =>
        {
          this.blackboard = Response;
          this.notificationService.displayNotification(
            {
              message: "Blackboard successfully edited",
            },
            NotificationType.INFO
          );
      });

    });
  }

  openContributorsDialog() {
    const dialogRef = this.dialog.open(BlackboardContributorsComponent, {
      width: '700px',
      data: this.blackboard.uuid
    });
  }

  isBlackboardOwner() {
    if (this.blackboard.role == "OWNER") {
      return true;
    }
    return false;
  }
}
