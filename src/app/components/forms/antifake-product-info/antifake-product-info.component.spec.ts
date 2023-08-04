import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntifakeProductInfoComponent } from './antifake-product-info.component';

describe('AntifakeProductInfoComponent', () => {
  let component: AntifakeProductInfoComponent;
  let fixture: ComponentFixture<AntifakeProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntifakeProductInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntifakeProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
