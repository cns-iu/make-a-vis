import { LegendViewModule } from './legend-view.module';

describe('LegendViewModule', () => {
  let legendViewModule: LegendViewModule;

  beforeEach(() => {
    legendViewModule = new LegendViewModule();
  });

  it('should create an instance', () => {
    expect(legendViewModule).toBeTruthy();
  });
});
