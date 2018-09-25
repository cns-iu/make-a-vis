import { TestBed, inject } from '@angular/core/testing';

import { LoadProjectService } from './load-project.service';

describe('LoadProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadProjectService]
    });
  });

  it('should be created', inject([LoadProjectService], (service: LoadProjectService) => {
    expect(service).toBeTruthy();
  }));
});
