import { TemporalBargraphModule } from './temporal-bargraph.module';

describe('TemporalBargraphModule', () => {
  let temporalBargraphModule: TemporalBargraphModule;

  beforeEach(() => {
    temporalBargraphModule = new TemporalBargraphModule();
  });

  it('should create an instance', () => {
    expect(temporalBargraphModule).toBeTruthy();
  });
});
