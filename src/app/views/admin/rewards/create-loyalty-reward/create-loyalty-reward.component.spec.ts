import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoyaltyRewardComponent } from './create-loyalty-reward.component';

describe('CreateLoyaltyRewardComponent', () => {
  let component: CreateLoyaltyRewardComponent;
  let fixture: ComponentFixture<CreateLoyaltyRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLoyaltyRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoyaltyRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
