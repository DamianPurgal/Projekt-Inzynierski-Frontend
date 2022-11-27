import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAssignedPersonComponent } from './comment-assigned-person.component';

describe('CommentAssignedPersonComponent', () => {
  let component: CommentAssignedPersonComponent;
  let fixture: ComponentFixture<CommentAssignedPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentAssignedPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentAssignedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
