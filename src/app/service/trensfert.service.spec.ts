import { TestBed } from '@angular/core/testing';

import { TrensfertService } from './trensfert.service';

describe('TrensfertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrensfertService = TestBed.get(TrensfertService);
    expect(service).toBeTruthy();
  });
});
