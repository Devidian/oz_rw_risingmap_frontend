import { TestBed } from '@angular/core/testing';

import { MapIdService } from './map-id.service';

describe('MapIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapIdService = TestBed.get(MapIdService);
    expect(service).toBeTruthy();
  });
});
