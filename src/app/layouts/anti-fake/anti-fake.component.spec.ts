import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiFakeComponent } from './anti-fake.component';

describe('AntiFakeComponent', () => {
  let component: AntiFakeComponent;
  let fixture: ComponentFixture<AntiFakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntiFakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiFakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
