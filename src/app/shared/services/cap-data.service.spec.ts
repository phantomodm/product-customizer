import { TestBed } from '@angular/core/testing';

import { CapDataService } from './cap-data.service';

describe('CapDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapDataService = TestBed.get(CapDataService);
    expect(service).toBeTruthy();
  });
});
