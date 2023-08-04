import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSurveysComponent } from './setup-surveys.component';

describe('SetupSurveysComponent', () => {
  let component: SetupSurveysComponent;
  let fixture: ComponentFixture<SetupSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupSurveysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
