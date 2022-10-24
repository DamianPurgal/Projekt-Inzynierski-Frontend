import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoNavbarComponent } from './userinfo-navbar.component';

describe('UserinfoNavbarComponent', () => {
  let component: UserinfoNavbarComponent;
  let fixture: ComponentFixture<UserinfoNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserinfoNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserinfoNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
