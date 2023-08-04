import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallCodeComponent } from './call-code.component';

describe('CallCodeComponent', () => {
  let component: CallCodeComponent;
  let fixture: ComponentFixture<CallCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
