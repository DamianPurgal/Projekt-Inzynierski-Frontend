import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap, catchError } from 'rxjs';
import { CommentService } from 'src/app/services/comment/comment.service';
import { CommentDto } from 'src/app/services/comment/interfaces/comment-dto';
import { NotificationType } from 'src/app/services/notification/enums/notification-type';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: CommentDto;
  @Output() deleteCommentEvent = new EventEmitter<string>();
  date !: string;
  isLoading: boolean = false;

  constructor(
    private commentService : CommentService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.date = this.getDate();
  }

  isLoggedUserAuthor() {
    if (sessionStorage.getItem("username")?.toLocaleLowerCase() === this.comment.author.email.toLocaleLowerCase()) {
      return true;
    }
    return false;
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment.uuid)
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
          throw new Error("Error while deleting comment");
        })
      ).subscribe(Response =>
        {
          this.notificationService.displayNotification(
            {
              message: "comment successfully deleted",
            },
            NotificationType.INFO
          );
          this.deleteCommentEvent.emit(this.comment.uuid);
      });
  }

  getDate() : string {
    var actualDate = new Date();
    var commentDate = this.comment.date;
    if (actualDate.getFullYear() - commentDate.getFullYear() > 0) {
      if (actualDate.getFullYear() - commentDate.getFullYear() == 1) {
        return "1 year ago";
      } else {
        return (actualDate.getFullYear() - commentDate.getFullYear()) + " years ago";
      }
    }
    else if (actualDate.getMonth() - commentDate.getMonth() > 0) {
      if (actualDate.getMonth() - commentDate.getMonth() == 1) {
        return "1 month ago";
      } else {
        return (actualDate.getMonth() - commentDate.getMonth()) + " months ago";
      }
    }
    else if (actualDate.getHours() - commentDate.getHours() > 0) {
      if (actualDate.getHours() - commentDate.getHours() == 1) {
        return "1 hour ago";
      } else {
        return (actualDate.getHours() - commentDate.getHours()) + " hours ago";
      }
    }
    else {
      if (actualDate.getMinutes() - commentDate.getMinutes() <= 1) {
        return "1 minute ago";
      } else {
        return (actualDate.getMinutes() - commentDate.getMinutes()) + " minutes ago";
      }
    }
  }

}
