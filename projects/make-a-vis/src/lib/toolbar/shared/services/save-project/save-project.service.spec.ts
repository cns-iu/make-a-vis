import { TestBed, inject } from '@angular/core/testing';

import { SaveProjectService } from './save-project.service';

describe('SaveProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveProjectService]
    });
  });

  it('should be created', inject([SaveProjectService], (service: SaveProjectService) => {
    expect(service).toBeTruthy();
  }));
});
