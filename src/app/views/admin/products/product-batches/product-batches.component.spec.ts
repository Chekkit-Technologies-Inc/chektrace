import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBatchesComponent } from './product-batches.component';

describe('ProductBatchesComponent', () => {
  let component: ProductBatchesComponent;
  let fixture: ComponentFixture<ProductBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
