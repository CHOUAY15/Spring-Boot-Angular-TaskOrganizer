import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportsTableComponent } from './rapports-table.component';

describe('RapportsTableComponent', () => {
  let component: RapportsTableComponent;
  let fixture: ComponentFixture<RapportsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
