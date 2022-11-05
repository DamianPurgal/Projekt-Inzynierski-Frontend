import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BlackboardDeleteDialogResult } from './interfaces/blackboard-delete-dialog-result';

@Component({
  selector: 'app-delete-blackboard',
  templateUrl: './delete-blackboard.component.html',
  styleUrls: ['./delete-blackboard.component.scss']
})
export class DeleteBlackboardComponent implements OnInit {

  dialogData: BlackboardDeleteDialogResult = {
    deleteBlackboard: true
  }

  constructor(public reference: MatDialogRef<DeleteBlackboardComponent>) {
    reference.disableClose = true;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogData.deleteBlackboard = false;
    this.reference.close();
  }

}
