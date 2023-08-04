import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandizeRewardComponent } from './merchandize-reward.component';

describe('MerchandizeRewardComponent', () => {
  let component: MerchandizeRewardComponent;
  let fixture: ComponentFixture<MerchandizeRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchandizeRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandizeRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
