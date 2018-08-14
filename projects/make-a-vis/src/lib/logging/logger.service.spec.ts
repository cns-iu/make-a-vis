import { TestBed, inject } from '@angular/core/testing';

import { Logger } from './logger.service';

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Logger, {provide: String, useValue: 'test'}]
    });
  });

  it('should be created', inject([Logger], (service: Logger) => {
    expect(service).toBeTruthy();
  }));
});
