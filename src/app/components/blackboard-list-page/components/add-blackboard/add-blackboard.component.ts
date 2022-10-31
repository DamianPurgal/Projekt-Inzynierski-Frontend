import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlackboardAdd } from 'src/app/services/blackboard/interfaces/blackboard-add';

@Component({
  selector: 'app-add-blackboard',
  templateUrl: './add-blackboard.component.html',
  styleUrls: ['./add-blackboard.component.scss']
})
export class AddBlackboardComponent implements OnInit {

  blackboardToAdd: BlackboardAdd = {
    name : "",
    description: "",
    color : ""
  }

  addBlackboardForm!: FormGroup;

  constructor(
    public reference: MatDialogRef<AddBlackboardComponent>
  ) {
    this.addBlackboardForm = new FormGroup({
      'name' : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'description' : new FormControl(null),
      'color' : new FormControl(null, [Validators.required]),
    });
  }



  ngOnInit(): void {
  }

  closeDialog() {
    this.reference.close();
  }
}
