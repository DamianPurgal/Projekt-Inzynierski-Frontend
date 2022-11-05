import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlackboardContributorComponent } from './add-blackboard-contributor.component';

describe('AddBlackboardContributorComponent', () => {
  let component: AddBlackboardContributorComponent;
  let fixture: ComponentFixture<AddBlackboardContributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBlackboardContributorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlackboardContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
