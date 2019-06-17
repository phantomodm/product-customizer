import { TestBed } from '@angular/core/testing';

import { GloveApiService } from './glove-api.service';

describe('GloveApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GloveApiService = TestBed.get(GloveApiService);
    expect(service).toBeTruthy();
  });
});
