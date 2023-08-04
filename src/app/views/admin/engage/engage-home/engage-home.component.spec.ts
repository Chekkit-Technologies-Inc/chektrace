import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngageHomeComponent } from './engage-home.component';

describe('EngageHomeComponent', () => {
  let component: EngageHomeComponent;
  let fixture: ComponentFixture<EngageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngageHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
