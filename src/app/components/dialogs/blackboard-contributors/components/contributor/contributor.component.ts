import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContributorDto } from 'src/app/services/contributor/interfaces/contributor-dto';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.scss']
})
export class ContributorComponent implements OnInit {


  @Input() contributor!: ContributorDto;
  @Output() deleteContributorEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  isOwner() {
    if (this.contributor.role == "OWNER") {
      return true;
    }
    return false;
  }

  deleteContributor() {
    this.deleteContributorEvent.emit(this.contributor.email);
  }
}
