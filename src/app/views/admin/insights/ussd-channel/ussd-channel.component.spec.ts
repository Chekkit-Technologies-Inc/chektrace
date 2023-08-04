import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdChannelComponent } from './ussd-channel.component';

describe('UssdChannelComponent', () => {
  let component: UssdChannelComponent;
  let fixture: ComponentFixture<UssdChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UssdChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UssdChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
