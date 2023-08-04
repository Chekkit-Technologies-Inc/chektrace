import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTableDropdownComponent } from './survey-table-dropdown.component';

describe('SurveyTableDropdownComponent', () => {
  let component: SurveyTableDropdownComponent;
  let fixture: ComponentFixture<SurveyTableDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyTableDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTableDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
