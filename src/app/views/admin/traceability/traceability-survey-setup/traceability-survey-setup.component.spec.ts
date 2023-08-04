import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceabilitySurveySetupComponent } from './traceability-survey-setup.component';

describe('TraceabilitySurveySetupComponent', () => {
  let component: TraceabilitySurveySetupComponent;
  let fixture: ComponentFixture<TraceabilitySurveySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraceabilitySurveySetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceabilitySurveySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
