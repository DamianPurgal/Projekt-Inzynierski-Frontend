import { Component, Input, OnInit } from '@angular/core';
import { ColumnDto } from 'src/app/services/column/interfaces/column-dto';

@Component({
  selector: 'app-blackboard-column',
  templateUrl: './blackboard-column.component.html',
  styleUrls: ['./blackboard-column.component.scss']
})
export class BlackboardColumnComponent implements OnInit {

  @Input() column!: ColumnDto;

  constructor() { }

  ngOnInit(): void {
  }

}
