import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachSurveyComponent } from './attach-survey.component';

describe('AttachSurveyComponent', () => {
  let component: AttachSurveyComponent;
  let fixture: ComponentFixture<AttachSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
