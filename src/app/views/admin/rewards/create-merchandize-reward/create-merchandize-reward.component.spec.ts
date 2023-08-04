import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMerchandizeRewardComponent } from './create-merchandize-reward.component';

describe('CreateMerchandizeRewardComponent', () => {
  let component: CreateMerchandizeRewardComponent;
  let fixture: ComponentFixture<CreateMerchandizeRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMerchandizeRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMerchandizeRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
