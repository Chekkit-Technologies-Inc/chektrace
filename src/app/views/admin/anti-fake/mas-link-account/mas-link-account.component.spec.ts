import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasLinkAccountComponent } from './mas-link-account.component';

describe('MasLinkAccountComponent', () => {
  let component: MasLinkAccountComponent;
  let fixture: ComponentFixture<MasLinkAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasLinkAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasLinkAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
