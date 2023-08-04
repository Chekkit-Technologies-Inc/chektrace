import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingLevelComponent } from './packaging-level.component';

describe('PackagingLevelComponent', () => {
  let component: PackagingLevelComponent;
  let fixture: ComponentFixture<PackagingLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
