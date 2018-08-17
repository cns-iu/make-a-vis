import { TestBed, inject } from '@angular/core/testing';
import { LogLevel } from '../log-levels';
import { Logger } from '../logger';
import { LoggerFactory } from '../logger-factory';
import { NullLogger } from './logger';
import { NullLoggerFactory } from './logger-factory';

describe('logging', () => {
describe('NullLogger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerFactory.use(NullLoggerFactory),
        Logger.for('test')
      ]
    });
  });

  describe('Factory', () => {
    it('creates', inject([LoggerFactory], (factory: LoggerFactory) => {
      expect(factory).toBeTruthy();
    }));

    it('is of type NullLoggerFactory', inject([LoggerFactory], (factory: LoggerFactory) => {
      expect(factory).toEqual(jasmine.any(NullLoggerFactory));
    }));
  });

  describe('Logger', () => {
    it('creates', inject([Logger], (logger: Logger) => {
      expect(logger).toBeTruthy();
    }));

    it('is of type NullLogger', inject([Logger], (logger: Logger) => {
      expect(logger).toEqual(jasmine.any(NullLogger));
    }));

    it('has a name', inject([Logger], (logger: Logger) => {
      expect(logger.name).toEqual('test');
    }));

    it('has a level', inject([Logger], (logger: Logger) => {
      expect(logger.level).toEqual(LogLevel.Off);
    }));
  });
});
});
