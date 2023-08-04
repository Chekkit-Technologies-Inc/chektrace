import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachRewardsComponent } from './attach-rewards.component';

describe('AttachRewardsComponent', () => {
  let component: AttachRewardsComponent;
  let fixture: ComponentFixture<AttachRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachRewardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
