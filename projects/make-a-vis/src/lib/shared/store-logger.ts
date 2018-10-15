import { AbstractCategoryLogger, Category, CategoryLogMessage, RuntimeSettings } from 'typescript-logging';

export class StoreLogger extends AbstractCategoryLogger {
  constructor(
    rootCategory: Category, runtimeSettings: RuntimeSettings,
    readonly controller: { isLoggingEnabled(): boolean }
  ) {
    super(rootCategory, runtimeSettings);
  }

  protected doLog(msg: CategoryLogMessage): void {
    if (this.controller.isLoggingEnabled()) {
      // TODO: Send log message somewhere! :p
    }
  }
}
