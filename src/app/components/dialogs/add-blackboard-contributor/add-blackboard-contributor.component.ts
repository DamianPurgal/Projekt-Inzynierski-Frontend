import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BlackboardContributorDialogResult } from './interfaces/blackboard-contributor-dialog-result';

@Component({
  selector: 'app-add-blackboard-contributor',
  templateUrl: './add-blackboard-contributor.component.html',
  styleUrls: ['./add-blackboard-contributor.component.scss']
})
export class AddBlackboardContributorComponent implements OnInit {

  addBlackboardContributorForm!: FormGroup;

  dialogData: BlackboardContributorDialogResult = {
    contributorEmail: "",
    canceled: false
  }

  constructor(
    public reference: MatDialogRef<AddBlackboardContributorComponent>
  ) {
    this.addBlackboardContributorForm = new FormGroup({
      'contributorEmail' : new FormControl(null, [Validators.required, Validators.email])
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
