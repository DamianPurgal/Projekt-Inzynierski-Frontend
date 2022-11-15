import { Pipe, PipeTransform } from '@angular/core';
import { ColumnDto } from 'src/app/services/column/interfaces/column-dto';

@Pipe({
  name: 'columnSort'
})
export class ColumnSortPipe implements PipeTransform {

  transform(contributors: ColumnDto[]): ColumnDto[] {
    return contributors.sort((a, b) => a.position - b.position);
  }

}
