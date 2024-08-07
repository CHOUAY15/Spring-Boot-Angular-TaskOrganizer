import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogeTacheComponent } from './dialoge-tache.component';

describe('DialogeTacheComponent', () => {
  let component: DialogeTacheComponent;
  let fixture: ComponentFixture<DialogeTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogeTacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogeTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
