import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { CommentService } from 'src/app/services/comment/comment.service';
import { CommentDto } from 'src/app/services/comment/interfaces/comment-dto';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: CommentDto[] = [];
  @Input() blackboardUUID!: string;
  @Input() columnUUID!: string;
  @Input() ticketUUID!: string;

  commentToAddText: string = "";
  addCommentForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private commentService : CommentService,
    private notificationService: NotificationService,
  ) {
    this.addCommentForm = new FormGroup({
      'text' : new FormControl(null, [Validators.required, Validators.minLength(1)])
    });
  }

  ngOnInit(): void {
  }

  addComment() {
    this.isLoading = true;

    this.commentService.addComment(
      {text: this.commentToAddText},
      this.blackboardUUID,
      this.columnUUID,
      this.ticketUUID
      )
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
        throw new Error("Comment add error");
      })
    ).subscribe(Response =>
      {
        Response.date = new Date(Response.date);
        this.comments.push(Response);
        this.notificationService.displayNotification(
          {
            message: "Comment created"
          },
          NotificationType.INFO
        );
    });
  }

  deleteComment(commentUUID : string) {
    this.comments.forEach( (comment, index) => {
      if (comment.uuid === commentUUID) {
        this.comments.splice(index, 1)
      }
    });
  }

}
