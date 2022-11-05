import { Pipe, PipeTransform } from '@angular/core';
import { BlackboardInfo } from 'src/app/services/blackboard/interfaces/blackboard-info';

@Pipe({
  name: 'blackboardSort'
})
export class BlackboardSortPipe implements PipeTransform {

  transform(blackboards: BlackboardInfo[]): BlackboardInfo[] {
    return blackboards.sort((a, b) => b.uuid.localeCompare(a.uuid));
  }

}
