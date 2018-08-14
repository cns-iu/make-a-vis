import { TestBed, inject } from '@angular/core/testing';

import { LoggerFactoryService } from './logger-factory.service';

describe('LoggerFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerFactoryService]
    });
  });

  it('should be created', inject([LoggerFactoryService], (service: LoggerFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
