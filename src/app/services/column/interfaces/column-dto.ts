import { TicketDto } from "../../ticket/interfaces/ticket-dto";

export interface ColumnDto {
  uuid: string,
  name: string,
  color: string,
  position: number,
  tickets: TicketDto[]
}
