import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTaskComponent } from './cart-task.component';

describe('CartTaskComponent', () => {
  let component: CartTaskComponent;
  let fixture: ComponentFixture<CartTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
