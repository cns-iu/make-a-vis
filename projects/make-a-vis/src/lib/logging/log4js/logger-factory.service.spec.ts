import { TestBed, inject } from '@angular/core/testing';

import { Log4JsLoggerFactoryService } from './logger-factory.service';

describe('Log4JsLoggerFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Log4JsLoggerFactoryService]
    });
  });

  it('should be created', inject([Log4JsLoggerFactoryService], (service: Log4JsLoggerFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
