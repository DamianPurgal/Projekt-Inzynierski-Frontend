import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentAddDto } from './interfaces/comment-add-dto';
import { CommentDto } from './interfaces/comment-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private addCommentURL : string = 'http://localhost:8080/api/blackboards/';
  private deleteCommentURL : string = 'http://localhost:8080/api/blackboards/comments/';

  constructor(
    private http: HttpClient
  ) { }

  addComment(comment: CommentAddDto, blackboardUUID: string, columnUUID: string, ticketUUID : string) : Observable<CommentDto> {
    return this.http.post<CommentDto>(
      this.addCommentURL + blackboardUUID + '/columns/' + columnUUID + '/tickets/' + ticketUUID + '/comments',
      comment
      );
  }

  deleteComment(commentUUID : string) : Observable<void> {
    return this.http.delete<void>(
      this.deleteCommentURL + commentUUID
      );
  }
}
