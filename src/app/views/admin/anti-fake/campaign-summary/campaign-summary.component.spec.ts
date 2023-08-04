import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSummaryComponent } from './campaign-summary.component';

describe('CampaignSummaryComponent', () => {
  let component: CampaignSummaryComponent;
  let fixture: ComponentFixture<CampaignSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
