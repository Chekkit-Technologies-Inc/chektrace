import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingCustomersDropdownComponent } from './existing-customers-dropdown.component';

describe('ExistingCustomersDropdownComponent', () => {
  let component: ExistingCustomersDropdownComponent;
  let fixture: ComponentFixture<ExistingCustomersDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingCustomersDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingCustomersDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
