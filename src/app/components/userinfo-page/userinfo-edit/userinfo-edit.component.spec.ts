import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoEditComponent } from './userinfo-edit.component';

describe('UserinfoEditComponent', () => {
  let component: UserinfoEditComponent;
  let fixture: ComponentFixture<UserinfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserinfoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserinfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
