import { TestBed } from '@angular/core/testing';

import { ResourceLoaderService } from './resource-loader.service';

describe('ResourceLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceLoaderService = TestBed.get(ResourceLoaderService);
    expect(service).toBeTruthy();
  });
});
