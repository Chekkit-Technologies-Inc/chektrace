import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceabilityMapComponent } from './traceability-map.component';

describe('TraceabilityMapComponent', () => {
  let component: TraceabilityMapComponent;
  let fixture: ComponentFixture<TraceabilityMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraceabilityMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceabilityMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
