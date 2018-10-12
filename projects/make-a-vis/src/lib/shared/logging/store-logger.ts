import { AbstractCategoryLogger, Category, CategoryLogMessage, RuntimeSettings } from 'typescript-logging';

import { Store, select } from '@ngrx/store';
import { ApplicationState, getLoadedProject } from '../../shared/store';

import { ActivityLogRawData, Project  } from 'dvl-fw';

export class StoreLogger extends AbstractCategoryLogger {
  constructor(
    rootCategory: Category, runtimeSettings: RuntimeSettings,
    readonly controller: { isLoggingEnabled(): boolean },
    private store: Store<ApplicationState>
  ) {
    super(rootCategory, runtimeSettings);
  }

  protected doLog(msg: CategoryLogMessage): void {

    if (this.controller.isLoggingEnabled()) {
      this.store.pipe(select(getLoadedProject))
      .subscribe((project: Project) => {
        console.log('project objecti in do log');
        console.log(project);
        if (project) {
          const activityLogRawData = project.rawData.find(obj => obj instanceof ActivityLogRawData) as ActivityLogRawData;
          console.log('msg is ');
          console.log(msg);
          if (activityLogRawData) {
          activityLogRawData.logActivity(msg);
          }
        }
      });
    }
  }
}
