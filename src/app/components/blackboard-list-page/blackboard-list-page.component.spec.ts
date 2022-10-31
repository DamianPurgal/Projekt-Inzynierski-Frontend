import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackboardListPageComponent } from './blackboard-list-page.component';

describe('BlackboardListPageComponent', () => {
  let component: BlackboardListPageComponent;
  let fixture: ComponentFixture<BlackboardListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackboardListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackboardListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
