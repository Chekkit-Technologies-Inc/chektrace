import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceabilityAttachRewardComponent } from './traceability-attach-reward.component';

describe('TraceabilityAttachRewardComponent', () => {
  let component: TraceabilityAttachRewardComponent;
  let fixture: ComponentFixture<TraceabilityAttachRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraceabilityAttachRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceabilityAttachRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
