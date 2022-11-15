import { Pipe, PipeTransform } from '@angular/core';
import { TicketDto } from 'src/app/services/ticket/interfaces/ticket-dto';

@Pipe({
  name: 'ticketSort'
})
export class TicketSortPipe implements PipeTransform {

  transform(contributors: TicketDto[]): TicketDto[] {
    return contributors.sort((a, b) => a.position - b.position);
  }

}
