import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeChannelComponent } from './qr-code-channel.component';

describe('QrCodeChannelComponent', () => {
  let component: QrCodeChannelComponent;
  let fixture: ComponentFixture<QrCodeChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
