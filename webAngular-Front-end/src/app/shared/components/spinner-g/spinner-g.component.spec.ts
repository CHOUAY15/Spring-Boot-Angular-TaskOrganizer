import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerGComponent } from './spinner-g.component';

describe('SpinnerGComponent', () => {
  let component: SpinnerGComponent;
  let fixture: ComponentFixture<SpinnerGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerGComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
