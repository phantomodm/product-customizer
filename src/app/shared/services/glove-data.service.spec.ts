import { TestBed } from '@angular/core/testing';

import { GloveDataService } from './glove-data.service';

describe('GloveDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GloveDataService = TestBed.get(GloveDataService);
    expect(service).toBeTruthy();
  });
});
