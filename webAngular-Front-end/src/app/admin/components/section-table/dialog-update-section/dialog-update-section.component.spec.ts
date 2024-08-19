import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateSectionComponent } from './dialog-update-section.component';

describe('DialogUpdateSectionComponent', () => {
  let component: DialogUpdateSectionComponent;
  let fixture: ComponentFixture<DialogUpdateSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUpdateSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
