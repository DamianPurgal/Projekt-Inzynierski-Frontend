import { CommentDto } from "../../comment/interfaces/comment-dto";

export interface TicketDetailedDto {
  uuid: string,
  name: string,
  description: string,
  color: string,
  position: number,
  comments: CommentDto[]
}
