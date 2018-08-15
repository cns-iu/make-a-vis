import { TestBed, inject } from '@angular/core/testing';
import { Logger } from '../logger';
import { LoggerFactory } from '../logger-factory';
import { DefaultLogger } from './logger';
import { DefaultLoggerFactoryService } from './logger-factory.service';

describe('Logging', () => {
describe('DefaultLoggerFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerFactory.use(DefaultLoggerFactoryService), Logger.for()]
    });
  });

  it('creates', inject([LoggerFactory], (service: LoggerFactory) => {
    expect(service).toBeTruthy();
  }));

  it('is of type DefaultLoggerFactoryService', inject([LoggerFactory], (service: LoggerFactory) => {
    expect(service).toEqual(jasmine.any(DefaultLoggerFactoryService));
  }));

  it('creates loggers', inject([Logger], (logger: Logger) => {
    expect(logger).toBeTruthy();
  }));

  it('creates loggers of type DefaultLogger', inject([Logger], (logger: Logger) => {
    expect(logger).toEqual(jasmine.any(DefaultLogger));
  }));
});
});
