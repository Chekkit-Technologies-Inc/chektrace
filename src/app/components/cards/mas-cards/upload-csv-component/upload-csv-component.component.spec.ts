import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCsvComponentComponent } from './upload-csv-component.component';

describe('UploadCsvComponentComponent', () => {
  let component: UploadCsvComponentComponent;
  let fixture: ComponentFixture<UploadCsvComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCsvComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCsvComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
