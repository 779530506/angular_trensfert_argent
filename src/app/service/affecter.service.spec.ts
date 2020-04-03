import { TestBed } from '@angular/core/testing';

import { AffecterService } from './affecter.service';

describe('AffecterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AffecterService = TestBed.get(AffecterService);
    expect(service).toBeTruthy();
  });
});
