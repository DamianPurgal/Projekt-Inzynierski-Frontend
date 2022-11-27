import { Pipe, PipeTransform } from '@angular/core';
import { CommentDto } from 'src/app/services/comment/interfaces/comment-dto';

@Pipe({
  name: 'commentSort'
})
export class CommentSortPipe implements PipeTransform {

  transform(contributors: CommentDto[]): CommentDto[] {
    return contributors.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

}
