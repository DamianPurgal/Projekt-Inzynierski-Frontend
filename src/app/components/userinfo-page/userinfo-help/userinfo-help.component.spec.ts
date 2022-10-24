import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoHelpComponent } from './userinfo-help.component';

describe('UserinfoHelpComponent', () => {
  let component: UserinfoHelpComponent;
  let fixture: ComponentFixture<UserinfoHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserinfoHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserinfoHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
