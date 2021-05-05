// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ActivityLogRawData, Project } from '@dvl-fw/core';
import { select, Store } from '@ngrx/store';
import { AbstractCategoryLogger, Category, CategoryLogMessage, RuntimeSettings } from 'typescript-logging';

import { ApplicationState, getLoadedProject } from '../../shared/store';
import { getLoggingToggleSelector, SidenavState } from '../../toolbar/shared/store';

function isActivityLogData(obj: unknown): obj is ActivityLogRawData {
  return typeof obj === 'object' && obj !== null && obj instanceof ActivityLogRawData;
}

export class StoreLogger extends AbstractCategoryLogger {

  private project: Project = undefined;
  constructor(
    rootCategory: Category, runtimeSettings: RuntimeSettings,
    readonly controller: { isLoggingEnabled(): boolean },
    private store: Store<ApplicationState>,
    private sidenavStore: Store<SidenavState>
  ) {
    super(rootCategory, runtimeSettings);
    this.store.pipe(select(getLoadedProject))
    .subscribe((project: Project) => {
      this.project = project;
    });

    this.sidenavStore.pipe(select(getLoggingToggleSelector))
      .subscribe((toggleLogging: boolean) => {
        if (this.project && this.project.rawData) {
        const activityLogRawData = this.project.rawData.find(isActivityLogData);
        activityLogRawData.saveActivityLog = toggleLogging;
        }
      });
    }


  protected doLog(msg: CategoryLogMessage): void {
    if (this.controller.isLoggingEnabled()) {
      if (this.project && this.project.rawData) {
        const activityLogRawData = this.project.rawData.find(isActivityLogData);
        if (activityLogRawData) {
        activityLogRawData.logActivity(msg);
        }
      }
    }
  }
}
