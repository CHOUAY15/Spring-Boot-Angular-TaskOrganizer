import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeTachesComponent } from './employe-taches.component';

describe('EmployeTachesComponent', () => {
  let component: EmployeTachesComponent;
  let fixture: ComponentFixture<EmployeTachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeTachesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
