import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDepartmentComponent } from './dialog-add-department.component';

describe('DialogAddDepartmentComponent', () => {
  let component: DialogAddDepartmentComponent;
  let fixture: ComponentFixture<DialogAddDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
