import { TestBed } from '@angular/core/testing';

import { ProjectManagerService } from './project-manager.service';

describe('ProjectManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectManagerService = TestBed.get(ProjectManagerService);
    expect(service).toBeTruthy();
  });
});
