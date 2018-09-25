import { TestBed, inject } from '@angular/core/testing';

import { NewProjectService } from './new-project.service';

describe('NewProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewProjectService]
    });
  });

  it('should be created', inject([NewProjectService], (service: NewProjectService) => {
    expect(service).toBeTruthy();
  }));
});
