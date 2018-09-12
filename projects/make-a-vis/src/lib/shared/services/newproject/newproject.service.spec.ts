import { TestBed, inject } from '@angular/core/testing';

import { NewprojectService } from './newproject.service';

describe('NewprojectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewprojectService]
    });
  });

  it('should be created', inject([NewprojectService], (service: NewprojectService) => {
    expect(service).toBeTruthy();
  }));
});
