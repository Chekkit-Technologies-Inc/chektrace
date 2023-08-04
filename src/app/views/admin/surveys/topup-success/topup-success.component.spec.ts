import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupSuccessComponent } from './topup-success.component';

describe('TopupSuccessComponent', () => {
  let component: TopupSuccessComponent;
  let fixture: ComponentFixture<TopupSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopupSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
