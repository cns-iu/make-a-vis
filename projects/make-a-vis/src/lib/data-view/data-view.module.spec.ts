import { DataViewModule } from './data-view.module';

describe('data-view', () => {
describe('DataViewModule', () => {
  let dataViewModule: DataViewModule;

  beforeEach(() => {
    dataViewModule = new DataViewModule();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  it('should create an instance', () => {
    expect(dataViewModule).toBeTruthy();
  });
});
});
