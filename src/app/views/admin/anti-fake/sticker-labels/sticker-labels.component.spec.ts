import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerLabelsComponent } from './sticker-labels.component';

describe('StickerLabelsComponent', () => {
  let component: StickerLabelsComponent;
  let fixture: ComponentFixture<StickerLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
