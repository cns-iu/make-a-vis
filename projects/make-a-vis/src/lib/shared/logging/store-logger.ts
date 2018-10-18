import { AbstractCategoryLogger, Category, CategoryLogMessage, RuntimeSettings } from 'typescript-logging';

import { Store, select } from '@ngrx/store';
import { ApplicationState, getLoadedProject } from '../../shared/store';
import * as fromUi from '../../toolbar/shared/store';

import { ActivityLogRawData, Project  } from 'dvl-fw';

export class StoreLogger extends AbstractCategoryLogger {

  private project: Project = undefined;
  constructor(
    rootCategory: Category, runtimeSettings: RuntimeSettings,
    readonly controller: { isLoggingEnabled(): boolean },
    private store: Store<ApplicationState>,
    private sidenavStore: Store<fromUi.SidenavState>
  ) {
    super(rootCategory, runtimeSettings);
    this.store.pipe(select(getLoadedProject))
    .subscribe((project: Project) => {
      this.project = project;
    });

    this.sidenavStore.pipe(select(fromUi.getLoggingToggleSelector))
      .subscribe((toggleLogging: boolean) => {
        if (this.project && this.project.rawData) {
        const activityLogRawData = this.project.rawData.find(obj => obj instanceof ActivityLogRawData) as ActivityLogRawData;
        activityLogRawData.saveActivityLog = toggleLogging;
        }
      });
    }


  protected doLog(msg: CategoryLogMessage): void {
    if (this.controller.isLoggingEnabled()) {
      if (this.project && this.project.rawData) {
        const activityLogRawData = this.project.rawData.find(obj => obj instanceof ActivityLogRawData) as ActivityLogRawData;
        if (activityLogRawData) {
        activityLogRawData.logActivity(msg);
        }
      }
    }
  }
}
