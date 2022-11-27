import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap, catchError } from 'rxjs';
import { ContributorService } from 'src/app/services/contributor/contributor.service';
import { ContributorDto } from 'src/app/services/contributor/interfaces/contributor-dto';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-blackboard-contributors',
  templateUrl: './blackboard-contributors.component.html',
  styleUrls: ['./blackboard-contributors.component.scss']
})
export class BlackboardContributorsComponent implements OnInit {

  contributors: ContributorDto[] = [];
  isLoading: boolean = false;
  addBlackboardContributorForm!: FormGroup;
  contributorToAddEmail!: string;

  constructor(
    public reference: MatDialogRef<BlackboardContributorsComponent>,
    private contributorService : ContributorService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public blackboardUUID: string,
  ) {
    reference.disableClose = true;

    this.addBlackboardContributorForm = new FormGroup({
      'contributorEmail' : new FormControl(null, [Validators.required, Validators.email])
    });

    this.getAllContributorsOfBlackboard();
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.reference.close();
  }

  getAllContributorsOfBlackboard() {
    this.isLoading = true;
    this.contributorService.getAllContributors(this.blackboardUUID)
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
        throw new Error("Contributors list loading error");
      })
    ).subscribe(Response =>
      {
        this.contributors = Response;
    });
  }


  addBlackboardContributor() {
      this.contributorService.addContributor({
        blackboardUUID: this.blackboardUUID,
        contributor: this.contributorToAddEmail
      })
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
          this.contributors.push(Response);
          this.notificationService.displayNotification(
            {
              message: "Contributor successfully added",
            },
            NotificationType.INFO
          );
      });
  }

  deleteContributor(contributorEmail : string) {
    console.log("CONTRIBUTOR :" + contributorEmail)
    this.contributorService.deleteContributor(
      {
        blackboardUUID: this.blackboardUUID,
        contributor: contributorEmail
      }
    ).pipe(
      tap(() => (this.isLoading = false)),
      catchError((error) => {
        this.isLoading = false;
        this.notificationService.displayNotification(
          {
            message: error.error.message,
          },
          NotificationType.WARNING
        );
        throw new Error("Error while delete blackboard contributor");
      })
    ).subscribe(Response =>
      {
        this.contributors.forEach( (contributor, index) => {
          if (contributor.user.email === contributorEmail) {
            this.contributors.splice(index,1)
          }
        });

        this.notificationService.displayNotification(
          {
            message: "Contributor successfully deleted",
          },
          NotificationType.INFO
        );
    });
  }


}
