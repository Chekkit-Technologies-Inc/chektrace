import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapDashboardComponent } from './sap-dashboard.component';

describe('SapDashboardComponent', () => {
  let component: SapDashboardComponent;
  let fixture: ComponentFixture<SapDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
