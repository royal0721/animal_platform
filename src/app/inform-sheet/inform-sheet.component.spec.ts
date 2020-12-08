import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformSheetComponent } from './inform-sheet.component';

describe('InformSheetComponent', () => {
  let component: InformSheetComponent;
  let fixture: ComponentFixture<InformSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
