import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionSiteComponent } from './redemption-site.component';

describe('RedemptionSiteComponent', () => {
  let component: RedemptionSiteComponent;
  let fixture: ComponentFixture<RedemptionSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedemptionSiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedemptionSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
