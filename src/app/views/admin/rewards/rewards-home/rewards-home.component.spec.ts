import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsHomeComponent } from './rewards-home.component';

describe('RewardsHomeComponent', () => {
  let component: RewardsHomeComponent;
  let fixture: ComponentFixture<RewardsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
