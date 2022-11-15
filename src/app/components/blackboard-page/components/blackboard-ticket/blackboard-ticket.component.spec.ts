import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackboardTicketComponent } from './blackboard-ticket.component';

describe('BlackboardTicketComponent', () => {
  let component: BlackboardTicketComponent;
  let fixture: ComponentFixture<BlackboardTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackboardTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackboardTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
