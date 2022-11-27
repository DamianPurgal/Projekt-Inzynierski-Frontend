import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketAddDto } from './interfaces/ticket-add-dto';
import { TicketDetailedDto } from './interfaces/ticket-detailed-dto';
import { TicketDto } from './interfaces/ticket-dto';
import { TicketEditDto } from './interfaces/ticket-edit-dto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient
  ) { }

  private addTicketURL : string = 'http://localhost:8080/api/blackboards/';
  private editTicketURL : string = 'http://localhost:8080/api/blackboards/';
  private getTickeDetailedtURL : string = 'http://localhost:8080/api/blackboards/';
  private assignUserToTicketURL : string = 'http://localhost:8080/api/blackboards/';
  private removeUserAssigmentToTicketURL : string = 'http://localhost:8080/api/blackboards/';
  private changeTicketPositionURL : string = 'http://localhost:8080/api/blackboards/';

  addTicket(ticket: TicketAddDto, blackboardUUID: string, columnUUID: string) : Observable<TicketDto> {
    return this.http.post<TicketDto>(
      this.addTicketURL + blackboardUUID + '/columns/' + columnUUID,
      ticket
      );
  }

  editTicket(ticket: TicketEditDto, blackboardUUID: string, columnUUID: string, ticketUUID: string) : Observable<TicketDto> {
    return this.http.put<TicketDto>(
      this.editTicketURL + blackboardUUID + '/columns/' + columnUUID + '/tickets/' + ticketUUID,
      ticket
      );
  }

  deleteTicket(blackboardUUID: string, columnUUID: string, ticketUUID: string) : Observable<void> {
    return this.http.delete<void>(
      this.addTicketURL + blackboardUUID + '/columns/' + columnUUID + '/tickets/' + ticketUUID);
  }

  getTicketDetailed(blackboardUUID: string, columnUUID: string, ticketUUID: string) : Observable<TicketDetailedDto> {
    return this.http.get<TicketDetailedDto>(
      this.getTickeDetailedtURL + blackboardUUID + '/columns/' + columnUUID + '/tickets/' + ticketUUID + '/detailed');
  }

  assignUserToTicket(blackboardUUID: string, columnUUID: string, ticketUUID: string, userEmail : string) : Observable<TicketDto> {
    const params = new HttpParams()
    .set('contributor', userEmail);

    return this.http.post<TicketDto>(
      this.assignUserToTicketURL + blackboardUUID + '/columns/' + columnUUID + '/tickets/' + ticketUUID + '/assignContributor',
      params
      );
  }

  removeUserAssigmentToTicket(blackboardUUID: string, columnUUID: string, ticketUUID: string) : Observable<TicketDto> {
    return this.http.post<TicketDto>(
      this.removeUserAssigmentToTicketURL + blackboardUUID + '/columns/' + columnUUID + '/tickets/' + ticketUUID + '/removeAssigment',
      null
      );
  }

  changeTicketPosition(
      blackboardUUID: string,
      columnUUID: string,
      ticketUUID: string,
      newPosition : number,
      newColumnUUID : string
    ) : Observable<TicketDto> {
    return this.http.put<TicketDto>(
      this.changeTicketPositionURL + blackboardUUID + '/columns/' + columnUUID +
      '/tickets/' + ticketUUID + '/changePosition?newPosition=' + newPosition + '&newColumnUUID=' + newColumnUUID,
      null
      );
  }


}
