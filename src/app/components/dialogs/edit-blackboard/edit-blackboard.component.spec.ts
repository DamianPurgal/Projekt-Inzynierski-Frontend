import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlackboardComponent } from './edit-blackboard.component';

describe('EditBlackboardComponent', () => {
  let component: EditBlackboardComponent;
  let fixture: ComponentFixture<EditBlackboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBlackboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBlackboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
