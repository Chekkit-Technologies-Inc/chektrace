import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductInfoComponent } from './add-product-info.component';

describe('AddProductInfoComponent', () => {
  let component: AddProductInfoComponent;
  let fixture: ComponentFixture<AddProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
