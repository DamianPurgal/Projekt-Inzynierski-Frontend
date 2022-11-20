import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlackboardInfo } from 'src/app/services/blackboard/interfaces/blackboard-info';
import { BlackboardEditDialogResult } from './interfaces/blackboard-edit-dialog-result';

@Component({
  selector: 'app-edit-blackboard',
  templateUrl: './edit-blackboard.component.html',
  styleUrls: ['./edit-blackboard.component.scss']
})
export class EditBlackboardComponent implements OnInit {

  dialogData: BlackboardEditDialogResult;
  editBlackboardForm!: FormGroup;

  constructor(
    public reference: MatDialogRef<EditBlackboardComponent>,
    @Inject(MAT_DIALOG_DATA) public blackboardInfo: BlackboardInfo,
  ) {
    this.editBlackboardForm = new FormGroup({
      'name' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'description' : new FormControl(null),
      'color' : new FormControl(null, [Validators.required]),
    });

    this.dialogData = {
      color: blackboardInfo.color,
      description: blackboardInfo.description,
      name: blackboardInfo.name,
      canceled: false
    }

    reference.disableClose = true;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogData.canceled = true;
    this.reference.close(this.dialogData);
  }

}
