import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInfoCardComponent } from './team-info-card.component';

describe('TeamInfoCardComponent', () => {
  let component: TeamInfoCardComponent;
  let fixture: ComponentFixture<TeamInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
