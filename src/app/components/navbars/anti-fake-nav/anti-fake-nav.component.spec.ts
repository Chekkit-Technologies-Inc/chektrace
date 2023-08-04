import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiFakeNavComponent } from './anti-fake-nav.component';

describe('AntiFakeNavComponent', () => {
  let component: AntiFakeNavComponent;
  let fixture: ComponentFixture<AntiFakeNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntiFakeNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiFakeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
