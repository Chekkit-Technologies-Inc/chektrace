import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthScanAreaComponent } from './auth-scan-area.component';

describe('AuthScanAreaComponent', () => {
  let component: AuthScanAreaComponent;
  let fixture: ComponentFixture<AuthScanAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthScanAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthScanAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
