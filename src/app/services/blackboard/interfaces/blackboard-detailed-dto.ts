import { ColumnDto } from "../../column/interfaces/column-dto";

export interface BlackboardDetailedDto {
  uuid: string,
  name: string,
  description: string,
  color: string,
  role: string,
  columns: ColumnDto[]
}
