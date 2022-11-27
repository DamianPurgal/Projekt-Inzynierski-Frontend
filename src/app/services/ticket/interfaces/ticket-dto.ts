import { UserData } from "../../user/interfaces/user-data";

export interface TicketDto {
  uuid: string,
  name: string,
  description: string,
  color: string,
  position: number,
  user: UserData
}
