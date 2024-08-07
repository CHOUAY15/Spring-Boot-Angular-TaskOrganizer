import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardEquipeComponent } from './list-card-equipe.component';

describe('ListCardEquipeComponent', () => {
  let component: ListCardEquipeComponent;
  let fixture: ComponentFixture<ListCardEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCardEquipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCardEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
