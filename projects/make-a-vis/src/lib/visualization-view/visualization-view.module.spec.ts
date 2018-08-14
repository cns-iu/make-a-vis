import { VisualizationViewModule } from './visualization-view.module';

describe('VisualizationViewModule', () => {
  let visualizationViewModule: VisualizationViewModule;

  beforeEach(() => {
    visualizationViewModule = new VisualizationViewModule();
  });

  it('should create an instance', () => {
    expect(visualizationViewModule).toBeTruthy();
  });
});
