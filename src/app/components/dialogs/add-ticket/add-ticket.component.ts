import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketAddDialogResult } from './interfaces/ticket-add-dialog-result';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  dialogData: TicketAddDialogResult = {
    name : "",
    description: "",
    color : "#C70039",
    canceled: false
  }

  addTicketForm!: FormGroup;

  constructor(
    public reference: MatDialogRef<AddTicketComponent>
  ) {
    this.addTicketForm = new FormGroup({
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
    this.reference.close();
  }

}
