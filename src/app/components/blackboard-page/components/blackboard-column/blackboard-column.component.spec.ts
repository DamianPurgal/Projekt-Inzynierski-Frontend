import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackboardColumnComponent } from './blackboard-column.component';

describe('BlackboardColumnComponent', () => {
  let component: BlackboardColumnComponent;
  let fixture: ComponentFixture<BlackboardColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackboardColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackboardColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
