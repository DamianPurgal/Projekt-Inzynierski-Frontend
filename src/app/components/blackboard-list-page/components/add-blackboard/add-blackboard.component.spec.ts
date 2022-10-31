import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlackboardComponent } from './add-blackboard.component';

describe('AddBlackboardComponent', () => {
  let component: AddBlackboardComponent;
  let fixture: ComponentFixture<AddBlackboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBlackboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlackboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
