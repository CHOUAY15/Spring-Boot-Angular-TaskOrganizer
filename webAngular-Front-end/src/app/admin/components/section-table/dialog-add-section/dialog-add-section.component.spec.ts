import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSectionComponent } from './dialog-add-section.component';

describe('DialogAddSectionComponent', () => {
  let component: DialogAddSectionComponent;
  let fixture: ComponentFixture<DialogAddSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
