import { UserData } from "../../user/interfaces/user-data";

export interface CommentDto {
  uuid: string,
  text: string,
  date: Date,
  author: UserData
}
