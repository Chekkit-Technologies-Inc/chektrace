import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsAnalyticsComponent } from './insights-analytics.component';

describe('InsightsAnalyticsComponent', () => {
  let component: InsightsAnalyticsComponent;
  let fixture: ComponentFixture<InsightsAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsightsAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
