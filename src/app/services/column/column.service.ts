import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnAddDto } from './interfaces/column-add-dto';
import { ColumnDto } from './interfaces/column-dto';
import { ColumnEditDto } from './interfaces/column-edit-dto';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(
    private http: HttpClient
  ) { }

  private addColumnURL : string = 'http://localhost:8080/api/blackboards/';
  private editColumnURL : string = 'http://localhost:8080/api/blackboards/';
  private deleteColumnURL : string = 'http://localhost:8080/api/blackboards/';
  private changeColumnPositionURL : string = 'http://localhost:8080/api/blackboards/';

  addColumn(column: ColumnAddDto, blackboardUUID: string) : Observable<ColumnDto> {
    return this.http.post<ColumnDto>(
      this.addColumnURL + blackboardUUID + '/columns',
      column
      );
  }

  editColumn(column: ColumnEditDto, blackboardUUID: string, columnUUID: string) : Observable<ColumnDto> {
    return this.http.put<ColumnDto>(
      this.editColumnURL + blackboardUUID + '/columns/' + columnUUID,
      column
      );
  }

  deleteColumn(blackboardUUID: string, columnUUID: string) : Observable<void> {
    return this.http.delete<void>(
      this.deleteColumnURL + blackboardUUID + '/columns/' + columnUUID
      );
  }

  changeColumnPosition(blackboardUUID: string, columnUUID: string, position: number) : Observable<ColumnDto> {
    return this.http.put<ColumnDto>(
      this.changeColumnPositionURL + blackboardUUID + '/columns/' + columnUUID + '/changePosition?newPosition=' + position,
      null
      );
  }
}
