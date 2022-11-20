import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ColumnAddDialogResult } from './interfaces/column-add-dialog-result';

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.scss']
})
export class AddColumnComponent implements OnInit {

  dialogData: ColumnAddDialogResult = {
    name : "",
    color : "#C70039",
    canceled: false
  }

  addColumnForm!: FormGroup;

  constructor(
    public reference: MatDialogRef<AddColumnComponent>
  ) {
    this.addColumnForm = new FormGroup({
      'name' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
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
