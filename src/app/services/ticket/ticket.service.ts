import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketAddDto } from './interfaces/ticket-add-dto';
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

  addTicket(ticket: TicketAddDto, blackboardUUID: string, columnUUID: string) : Observable<TicketDto> {
    return this.http.post<TicketDto>(
      this.addTicketURL + blackboardUUID + '/columns/' + columnUUID,
      ticket
      );
  }

  editTicket(ticket: TicketEditDto, blackboardUUID: string, columnUUID: string, ticketUUID: string) : Observable<TicketDto> {
    return this.http.put<TicketDto>(
      this.addTicketURL + blackboardUUID + '/columns/' + columnUUID + '/tickets/' + ticketUUID,
      ticket
      );
  }

  deleteTicket(blackboardUUID: string, columnUUID: string, ticketUUID: string) : Observable<void> {
    return this.http.delete<void>(
      this.addTicketURL + blackboardUUID + '/columns/' + columnUUID + '/tickets/' + ticketUUID);
  }
}
