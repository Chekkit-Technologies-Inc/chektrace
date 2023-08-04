import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingNavComponent } from './gaming-nav.component';

describe('GamingNavComponent', () => {
  let component: GamingNavComponent;
  let fixture: ComponentFixture<GamingNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamingNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamingNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
