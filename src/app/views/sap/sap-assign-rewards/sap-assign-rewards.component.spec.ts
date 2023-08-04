import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapAssignRewardsComponent } from './sap-assign-rewards.component';

describe('SapAssignRewardsComponent', () => {
  let component: SapAssignRewardsComponent;
  let fixture: ComponentFixture<SapAssignRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapAssignRewardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SapAssignRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
