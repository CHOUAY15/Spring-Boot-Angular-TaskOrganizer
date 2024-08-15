import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTeamComponent } from './dialog-add-team.component';

describe('DialogAddTeamComponent', () => {
  let component: DialogAddTeamComponent;
  let fixture: ComponentFixture<DialogAddTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
