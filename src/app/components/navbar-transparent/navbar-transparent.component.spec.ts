import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTransparentComponent } from './navbar-transparent.component';

describe('NavbarTransparentComponent', () => {
  let component: NavbarTransparentComponent;
  let fixture: ComponentFixture<NavbarTransparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarTransparentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTransparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
