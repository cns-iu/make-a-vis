import { DataViewModule } from './data-view.module';

describe('DataViewModule', () => {
  let dataViewModule: DataViewModule;

  beforeEach(() => {
    dataViewModule = new DataViewModule();
  });

  it('should create an instance', () => {
    expect(dataViewModule).toBeTruthy();
  });
});
