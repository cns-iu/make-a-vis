import { TestBed } from '@angular/core/testing';

import { ProjectLoaderService } from './project-loader.service';

describe('ProjectLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectLoaderService = TestBed.get(ProjectLoaderService);
    expect(service).toBeTruthy();
  });
});
