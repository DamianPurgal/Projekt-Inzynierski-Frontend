import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContributorDto } from 'src/app/services/contributor/interfaces/contributor-dto';

@Component({
  selector: 'app-comment-assigned-person',
  templateUrl: './comment-assigned-person.component.html',
  styleUrls: ['./comment-assigned-person.component.scss']
})
export class CommentAssignedPersonComponent implements OnInit {

  @Input() contributor!: ContributorDto;
  @Output() contributorAssignedEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addContributor() {
    this.contributorAssignedEvent.emit(this.contributor.user.email)
  }

}
