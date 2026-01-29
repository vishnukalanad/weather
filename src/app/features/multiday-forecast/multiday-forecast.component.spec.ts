import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultidayForecastComponent } from './multiday-forecast.component';

describe('MultidayForecastComponent', () => {
  let component: MultidayForecastComponent;
  let fixture: ComponentFixture<MultidayForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultidayForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultidayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
