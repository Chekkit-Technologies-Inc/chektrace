import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapAssignSurveysComponent } from './sap-assign-surveys.component';

describe('SapAssignSurveysComponent', () => {
  let component: SapAssignSurveysComponent;
  let fixture: ComponentFixture<SapAssignSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapAssignSurveysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapAssignSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
