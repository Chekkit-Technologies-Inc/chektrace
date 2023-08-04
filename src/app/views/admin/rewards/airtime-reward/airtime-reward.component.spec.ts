import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirtimeRewardComponent } from './airtime-reward.component';

describe('AirtimeRewardComponent', () => {
  let component: AirtimeRewardComponent;
  let fixture: ComponentFixture<AirtimeRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirtimeRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirtimeRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
