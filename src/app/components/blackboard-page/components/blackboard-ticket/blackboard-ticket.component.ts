import { Component, Input, OnInit } from '@angular/core';
import { TicketDto } from 'src/app/services/ticket/interfaces/ticket-dto';

@Component({
  selector: 'app-blackboard-ticket',
  templateUrl: './blackboard-ticket.component.html',
  styleUrls: ['./blackboard-ticket.component.scss']
})
export class BlackboardTicketComponent implements OnInit {

  @Input() ticket!: TicketDto;

  constructor() { }

  ngOnInit(): void {
  }

}
