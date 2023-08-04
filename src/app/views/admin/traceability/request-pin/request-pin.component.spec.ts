import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPinComponent } from './request-pin.component';

describe('RequestPinComponent', () => {
  let component: RequestPinComponent;
  let fixture: ComponentFixture<RequestPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
