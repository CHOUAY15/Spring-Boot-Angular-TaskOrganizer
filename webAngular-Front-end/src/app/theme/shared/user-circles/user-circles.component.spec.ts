import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCirclesComponent } from './user-circles.component';

describe('UserCirclesComponent', () => {
  let component: UserCirclesComponent;
  let fixture: ComponentFixture<UserCirclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCirclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
