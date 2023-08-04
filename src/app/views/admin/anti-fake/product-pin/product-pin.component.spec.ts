import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPinComponent } from './product-pin.component';

describe('ProductPinComponent', () => {
  let component: ProductPinComponent;
  let fixture: ComponentFixture<ProductPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
