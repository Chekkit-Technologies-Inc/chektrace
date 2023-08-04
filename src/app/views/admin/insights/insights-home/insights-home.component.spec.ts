import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsHomeComponent } from './insights-home.component';

describe('InsightsHomeComponent', () => {
  let component: InsightsHomeComponent;
  let fixture: ComponentFixture<InsightsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsightsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
