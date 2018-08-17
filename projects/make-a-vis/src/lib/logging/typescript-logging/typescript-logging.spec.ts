import { TestBed, inject } from '@angular/core/testing';
import {
  Category, CategoryConfiguration, CategoryDelegateLoggerImpl,
  CategoryLogger, CategoryMessageBufferLoggerImpl, CategoryServiceFactory,
  LoggerType, LogLevel as ImplLogLevel
} from 'typescript-logging';
import { LogLevel } from '../log-levels';
import { Logger } from '../logger';
import { LoggerFactory } from '../logger-factory';
import { TypescriptLoggingLogger } from './logger';
import { TypescriptLoggingConfiguration, TypescriptLoggingLoggerFactory } from './logger-factory';

describe('logging', () => {
describe('TypescriptLoggingLogger', () => {
  // Copied with some modifications from typescript-logging tests
  function getMessages(logger: Logger): string[] {
    const implLogger: CategoryLogger | Category = (logger as TypescriptLoggingLogger).category;
    let delegate: CategoryDelegateLoggerImpl;
    if (implLogger instanceof Category) {
      delegate = (implLogger as any)._logger as CategoryDelegateLoggerImpl;
    } else {
      delegate = implLogger as CategoryDelegateLoggerImpl;
    }
    expect(delegate).toBeDefined();

    const actualLogger = delegate.delegate;
    expect(actualLogger instanceof CategoryMessageBufferLoggerImpl).toBeTruthy();
    return (actualLogger as CategoryMessageBufferLoggerImpl).getMessages();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TypescriptLoggingConfiguration,
          useValue: new CategoryConfiguration(ImplLogLevel.Info, LoggerType.MessageBuffer)
        },
        LoggerFactory.use(TypescriptLoggingLoggerFactory),
        Logger.for('test')
      ]
    });
  });

  describe('Factory', () => {
    it('creates', inject([LoggerFactory], (factory: LoggerFactory) => {
      expect(factory).toBeTruthy();
    }));

    it('is of type TypescriptLoggingLoggerFactory', inject([LoggerFactory], (factory: LoggerFactory) => {
      expect(factory).toEqual(jasmine.any(TypescriptLoggingLoggerFactory));
    }));
  });

  describe('Logger', () => {
    it('creates', inject([Logger], (logger: Logger) => {
      expect(logger).toBeTruthy();
    }));

    it('is of type TypescriptLoggingLogger', inject([Logger], (logger: Logger) => {
      expect(logger).toEqual(jasmine.any(TypescriptLoggingLogger));
    }));

    it('has a name', inject([Logger], (logger: Logger) => {
      expect(logger.name).toEqual('test');
    }));

    it('has a level', inject([Logger], (logger: Logger) => {
      expect(logger.level).toEqual(LogLevel.Info);
    }));

    it('logs messages to the underlying logger', inject([Logger], (logger: Logger) => {
      logger.warn('a message');
      expect(getMessages(logger)[0]).toContain('a message');
    }));
  });
});
});
