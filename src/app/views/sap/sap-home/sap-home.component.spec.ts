import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapHomeComponent } from './sap-home.component';

describe('SapHomeComponent', () => {
  let component: SapHomeComponent;
  let fixture: ComponentFixture<SapHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
