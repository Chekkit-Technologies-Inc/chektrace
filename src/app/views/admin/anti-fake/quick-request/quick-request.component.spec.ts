import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRequestComponent } from './quick-request.component';

describe('QuickRequestComponent', () => {
  let component: QuickRequestComponent;
  let fixture: ComponentFixture<QuickRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
