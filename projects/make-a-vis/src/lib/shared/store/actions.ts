import { Action } from '@ngrx/store';

// actions with new inputs
export const APPLICATION_INITIALIZED = 'APPLICATION_INITIALIZED';

export class ApplicationInitializedAction implements Action {
  readonly type = APPLICATION_INITIALIZED;
  constructor(public payload = {}) {
  }
}
