import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeliverablesComponent } from './list-deliverables.component';

describe('ListDeliverablesComponent', () => {
  let component: ListDeliverablesComponent;
  let fixture: ComponentFixture<ListDeliverablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDeliverablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeliverablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
