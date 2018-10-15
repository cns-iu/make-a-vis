import { TestBed } from '@angular/core/testing';

import { GetLinkService } from './get-link.service';

describe('GetLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetLinkService = TestBed.get(GetLinkService);
    expect(service).toBeTruthy();
  });
});
