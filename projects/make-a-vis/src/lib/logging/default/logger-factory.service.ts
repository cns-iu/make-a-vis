import { Injectable } from '@angular/core';
import { LoggerFactory } from '../logger-factory';
import { DefaultLogger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class DefaultLoggerFactoryService extends LoggerFactory {
  createLogger(category?: string): DefaultLogger {
    return new DefaultLogger(category);
  }
}
