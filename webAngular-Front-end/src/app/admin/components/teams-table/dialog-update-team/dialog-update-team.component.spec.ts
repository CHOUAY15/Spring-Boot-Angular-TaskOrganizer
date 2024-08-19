import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateTeamComponent } from './dialog-update-team.component';

describe('DialogUpdateTeamComponent', () => {
  let component: DialogUpdateTeamComponent;
  let fixture: ComponentFixture<DialogUpdateTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUpdateTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUpdateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
