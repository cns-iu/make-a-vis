import { SciencemapModule } from './sciencemap.module';

describe('SciencemapModule', () => {
  let sciencemapModule: SciencemapModule;

  beforeEach(() => {
    sciencemapModule = new SciencemapModule();
  });

  it('should create an instance', () => {
    expect(sciencemapModule).toBeTruthy();
  });
});
