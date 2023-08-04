import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductsChartComponent } from './card-products-chart.component';

describe('CardProductsChartComponent', () => {
  let component: CardProductsChartComponent;
  let fixture: ComponentFixture<CardProductsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardProductsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProductsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
