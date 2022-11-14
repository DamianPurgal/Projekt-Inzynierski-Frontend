import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackboardNavbarComponent } from './blackboard-navbar.component';

describe('BlackboardNavbarComponent', () => {
  let component: BlackboardNavbarComponent;
  let fixture: ComponentFixture<BlackboardNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackboardNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackboardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
