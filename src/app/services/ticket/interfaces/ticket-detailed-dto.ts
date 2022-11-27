import { CommentDto } from "../../comment/interfaces/comment-dto";
import { UserData } from "../../user/interfaces/user-data";

export interface TicketDetailedDto {
  uuid: string,
  name: string,
  description: string,
  color: string,
  position: number,
  user: UserData,
  comments: CommentDto[]
}
