import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { TicketEditDialogResult } from './interfaces/ticket-edit-dialog-result';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {

  dialogData: TicketEditDialogResult = {
    name : "",
    description: "",
    color : "#C70039",
    canceled: false
  }

  editTicketForm!: FormGroup;

  constructor(
    public reference: MatDialogRef<AddTicketComponent>
  ) {
    this.editTicketForm = new FormGroup({
      'name' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'description' : new FormControl(null),
      'color' : new FormControl(null, [Validators.required]),
    });
    reference.disableClose = true;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogData.canceled = true;
    this.reference.close(this.dialogData);
  }
}
