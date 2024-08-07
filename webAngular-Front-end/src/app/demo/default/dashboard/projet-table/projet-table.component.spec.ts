import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetTableComponent } from './projet-table.component';

describe('ProjetTableComponent', () => {
  let component: ProjetTableComponent;
  let fixture: ComponentFixture<ProjetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
