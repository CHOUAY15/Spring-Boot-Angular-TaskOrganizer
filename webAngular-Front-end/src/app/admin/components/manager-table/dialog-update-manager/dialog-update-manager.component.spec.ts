import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateManagerComponent } from './dialog-update-manager.component';

describe('DialogUpdateManagerComponent', () => {
  let component: DialogUpdateManagerComponent;
  let fixture: ComponentFixture<DialogUpdateManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUpdateManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
