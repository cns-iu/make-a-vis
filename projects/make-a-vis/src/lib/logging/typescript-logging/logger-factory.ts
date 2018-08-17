import { Inject, Injectable, InjectionToken, Optional, SkipSelf } from '@angular/core';
import { Category, CategoryConfiguration, CategoryServiceFactory } from 'typescript-logging';
import { Logger } from '../logger';
import { LoggerFactory } from '../logger-factory';
import { TypescriptLoggingLogger } from './logger';

const getRootCategory = (() => {
  let rootCategory: Category;
  return (config: CategoryConfiguration): Category => {
    CategoryServiceFactory.setDefaultConfiguration(config);
    return rootCategory || (rootCategory = new Category('.'));
  };
})();

export const TypescriptLoggingConfiguration = new InjectionToken<CategoryConfiguration>(
  'typescript-logging-configuration', {
    providedIn: 'root',
    factory: () => new CategoryConfiguration()
  }
);

@Injectable()
export class TypescriptLoggingLoggerFactory extends LoggerFactory {
  readonly config: CategoryConfiguration;
  readonly category: Category;

  constructor(
    @SkipSelf() @Optional() parent: LoggerFactory,
    @Inject(TypescriptLoggingConfiguration) config: CategoryConfiguration
  ) {
    super(parent);
    const tsParent = this.findFirstParent(parent);
    const parentCategory = tsParent ? tsParent.category : getRootCategory(config);
    const index = this.findNextNameIndex(parentCategory);
    this.config = config;
    this.category = new Category(`<${index}>`, parentCategory);
  }

  createLogger(name: string = '<?>'): Logger {
    return new TypescriptLoggingLogger(name, this.category, this.config.logLevel);
  }

  private findFirstParent(parent: LoggerFactory): TypescriptLoggingLoggerFactory {
    while (parent && !(parent instanceof TypescriptLoggingLoggerFactory)) {
      parent = parent.parent;
    }
    return parent as TypescriptLoggingLoggerFactory;
  }

  private findNextNameIndex(category: Category): number {
    return category.children.reduce((nextIndex, cat) => {
      const match = /^<(\d+)>$/.exec(cat.name);
      const index = (match && Number(match[1])) || 0;
      return Math.max(nextIndex, index);
    }, -1) + 1;
  }
}
