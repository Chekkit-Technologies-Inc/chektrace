import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAirtimeRewardComponent } from './create-airtime-reward.component';

describe('CreateAirtimeRewardComponent', () => {
  let component: CreateAirtimeRewardComponent;
  let fixture: ComponentFixture<CreateAirtimeRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAirtimeRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAirtimeRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
