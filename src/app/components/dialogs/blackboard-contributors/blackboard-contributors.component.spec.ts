import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackboardContributorsComponent } from './blackboard-contributors.component';

describe('BlackboardContributorsComponent', () => {
  let component: BlackboardContributorsComponent;
  let fixture: ComponentFixture<BlackboardContributorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackboardContributorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackboardContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
