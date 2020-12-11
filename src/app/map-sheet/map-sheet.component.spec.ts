import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSheetComponent } from './map-sheet.component';

describe('MapSheetComponent', () => {
  let component: MapSheetComponent;
  let fixture: ComponentFixture<MapSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
