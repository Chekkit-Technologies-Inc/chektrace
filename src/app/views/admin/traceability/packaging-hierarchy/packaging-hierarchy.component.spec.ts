import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingHierarchyComponent } from './packaging-hierarchy.component';

describe('PackagingHierarchyComponent', () => {
  let component: PackagingHierarchyComponent;
  let fixture: ComponentFixture<PackagingHierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingHierarchyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
