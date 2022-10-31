import { Component, Input, OnInit } from '@angular/core';
import { BlackboardInfo } from 'src/app/services/blackboard/interfaces/blackboard-info';

@Component({
  selector: 'app-blackboard',
  templateUrl: './blackboard.component.html',
  styleUrls: ['./blackboard.component.scss']
})
export class BlackboardComponent implements OnInit {

  constructor() { }

  @Input() blackboard!: BlackboardInfo;

  ngOnInit(): void {
  }

}
