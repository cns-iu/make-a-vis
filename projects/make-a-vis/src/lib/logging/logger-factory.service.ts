import { Injectable } from '@angular/core';
import { Logger } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerFactoryService {
  constructor() { }

  createLogger(category?: string): Logger {
    return new Logger(category);
  }
}
