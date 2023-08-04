import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSerialComponent } from './generate-serial.component';

describe('GenerateSerialComponent', () => {
  let component: GenerateSerialComponent;
  let fixture: ComponentFixture<GenerateSerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateSerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
