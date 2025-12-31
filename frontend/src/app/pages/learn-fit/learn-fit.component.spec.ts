import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnFitnessComponent } from './learn-fit.component';

describe('LearnFirComponent', () => {
  let component:LearnFitnessComponent;
  let fixture: ComponentFixture<LearnFitnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnFitnessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnFitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
