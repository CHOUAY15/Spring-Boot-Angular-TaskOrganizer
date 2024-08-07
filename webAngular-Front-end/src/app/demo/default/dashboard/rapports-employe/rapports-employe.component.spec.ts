import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportsEmployeComponent } from './rapports-employe.component';

describe('RapportsEmployeComponent', () => {
  let component: RapportsEmployeComponent;
  let fixture: ComponentFixture<RapportsEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportsEmployeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportsEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
