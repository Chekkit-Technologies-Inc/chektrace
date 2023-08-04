import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapSignupComponent } from './sap-signup.component';

describe('SapSignupComponent', () => {
  let component: SapSignupComponent;
  let fixture: ComponentFixture<SapSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
