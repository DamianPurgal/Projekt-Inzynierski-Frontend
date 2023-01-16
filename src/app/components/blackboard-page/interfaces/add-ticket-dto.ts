import { ColumnDto } from "src/app/services/column/interfaces/column-dto";
import { TicketAddDto } from "src/app/services/ticket/interfaces/ticket-add-dto";


export interface AddTicketEmitMessage {
  column: ColumnDto;
  ticket: TicketAddDto;
}
