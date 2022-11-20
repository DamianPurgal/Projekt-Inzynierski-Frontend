import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketDeleteDialogResult } from './interfaces/ticket-delete-dialog-result';

@Component({
  selector: 'app-delete-ticket',
  templateUrl: './delete-ticket.component.html',
  styleUrls: ['./delete-ticket.component.scss']
})
export class DeleteTicketComponent implements OnInit {

  dialogData: TicketDeleteDialogResult = {
    deleteTicket: true
  }

  constructor(public reference: MatDialogRef<DeleteTicketComponent>) {
    reference.disableClose = true;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogData.deleteTicket = false;
    this.reference.close(this.dialogData);
  }

}
