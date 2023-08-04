import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSerialComponent } from './request-serial.component';

describe('RequestSerialComponent', () => {
  let component: RequestSerialComponent;
  let fixture: ComponentFixture<RequestSerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
