import { ScatterplotModule } from './scatterplot.module';

describe('ScatterplotModule', () => {
  let scatterplotModule: ScatterplotModule;

  beforeEach(() => {
    scatterplotModule = new ScatterplotModule();
  });

  it('should create an instance', () => {
    expect(scatterplotModule).toBeTruthy();
  });
});
