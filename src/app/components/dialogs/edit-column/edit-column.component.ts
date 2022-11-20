import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ColumnEditDialogResult } from './interfaces/column-edit-dialog-result';

@Component({
  selector: 'app-edit-column',
  templateUrl: './edit-column.component.html',
  styleUrls: ['./edit-column.component.scss']
})
export class EditColumnComponent implements OnInit {

  dialogData: ColumnEditDialogResult = {
    name : "",
    color : "#C70039",
    canceled: false
  }

  editColumnForm!: FormGroup;

  constructor(
    public reference: MatDialogRef<EditColumnComponent>
  ) {
    this.editColumnForm = new FormGroup({
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
