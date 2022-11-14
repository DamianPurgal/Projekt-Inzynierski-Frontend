import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackboardPageComponent } from './blackboard-page.component';

describe('BlackboardPageComponent', () => {
  let component: BlackboardPageComponent;
  let fixture: ComponentFixture<BlackboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
