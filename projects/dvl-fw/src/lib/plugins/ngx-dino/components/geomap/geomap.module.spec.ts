import { GeomapModule } from './geomap.module';

describe('GeomapModule', () => {
  let geomapModule: GeomapModule;

  beforeEach(() => {
    geomapModule = new GeomapModule();
  });

  it('should create an instance', () => {
    expect(geomapModule).toBeTruthy();
  });
});
