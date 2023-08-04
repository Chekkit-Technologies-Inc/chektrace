import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRewardStatiticsComponent } from './card-reward-statitics.component';

describe('CardRewardStatiticsComponent', () => {
  let component: CardRewardStatiticsComponent;
  let fixture: ComponentFixture<CardRewardStatiticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRewardStatiticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRewardStatiticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
