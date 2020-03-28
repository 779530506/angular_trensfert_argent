import { TestBed } from '@angular/core/testing';

import { PartenaireServiceService } from './partenaire-service.service';

describe('PartenaireServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartenaireServiceService = TestBed.get(PartenaireServiceService);
    expect(service).toBeTruthy();
  });
});
