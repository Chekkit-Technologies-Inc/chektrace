import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialNumberSummaryComponent } from './serial-number-summary.component';

describe('SerialNumberSummaryComponent', () => {
  let component: SerialNumberSummaryComponent;
  let fixture: ComponentFixture<SerialNumberSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerialNumberSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialNumberSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
