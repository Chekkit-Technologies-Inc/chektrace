import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingDashboardComponent } from './gaming-dashboard.component';

describe('GamingDashboardComponent', () => {
  let component: GamingDashboardComponent;
  let fixture: ComponentFixture<GamingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamingDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
