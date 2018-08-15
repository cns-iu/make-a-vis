import { TestBed, inject } from '@angular/core/testing';

import { DefaultLoggerFactoryService } from './logger-factory.service';

describe('DefaultLoggerFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultLoggerFactoryService]
    });
  });

  it('should be created', inject([DefaultLoggerFactoryService], (service: DefaultLoggerFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
