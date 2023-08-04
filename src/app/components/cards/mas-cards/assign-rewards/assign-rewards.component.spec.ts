import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRewardsComponent } from './assign-rewards.component';

describe('AssignRewardsComponent', () => {
  let component: AssignRewardsComponent;
  let fixture: ComponentFixture<AssignRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRewardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
