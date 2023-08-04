import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMapProductStatsComponent } from './card-map-product-stats.component';

describe('CardMapProductStatsComponent', () => {
  let component: CardMapProductStatsComponent;
  let fixture: ComponentFixture<CardMapProductStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMapProductStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMapProductStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
