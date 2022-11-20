import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ColumnDeleteDialogResult } from './interfaces/column-delete-dialog-result';

@Component({
  selector: 'app-delete-column',
  templateUrl: './delete-column.component.html',
  styleUrls: ['./delete-column.component.scss']
})
export class DeleteColumnComponent implements OnInit {

  dialogData: ColumnDeleteDialogResult = {
    deleteColumn: true
  }

  constructor(public reference: MatDialogRef<DeleteColumnComponent>) {
    reference.disableClose = true;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogData.deleteColumn = false;
    this.reference.close(this.dialogData);
  }

}
