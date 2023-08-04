import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRaffleRewardComponent } from './create-raffle-reward.component';

describe('CreateRaffleRewardComponent', () => {
  let component: CreateRaffleRewardComponent;
  let fixture: ComponentFixture<CreateRaffleRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRaffleRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRaffleRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
