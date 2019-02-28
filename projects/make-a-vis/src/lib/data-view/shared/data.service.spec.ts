import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
