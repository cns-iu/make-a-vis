import { TestBed } from '@angular/core/testing';

import { DataLinkService } from './data-link.service';

describe('DataLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataLinkService = TestBed.get(DataLinkService);
    expect(service).toBeTruthy();
  });
});
