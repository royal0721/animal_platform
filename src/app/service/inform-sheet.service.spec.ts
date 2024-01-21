import { TestBed } from '@angular/core/testing';

import { InformSheetService } from './inform-sheet.service';

describe('InformSheetService', () => {
  let service: InformSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
