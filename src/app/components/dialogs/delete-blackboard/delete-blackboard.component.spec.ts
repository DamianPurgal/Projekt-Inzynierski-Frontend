import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBlackboardComponent } from './delete-blackboard.component';

describe('DeleteBlackboardComponent', () => {
  let component: DeleteBlackboardComponent;
  let fixture: ComponentFixture<DeleteBlackboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBlackboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBlackboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
