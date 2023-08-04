import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachRewardComponent } from './attach-reward.component';

describe('AttachRewardComponent', () => {
  let component: AttachRewardComponent;
  let fixture: ComponentFixture<AttachRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
