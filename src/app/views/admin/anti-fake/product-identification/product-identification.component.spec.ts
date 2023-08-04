import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIdentificationComponent } from './product-identification.component';

describe('ProductIdentificationComponent', () => {
  let component: ProductIdentificationComponent;
  let fixture: ComponentFixture<ProductIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductIdentificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
