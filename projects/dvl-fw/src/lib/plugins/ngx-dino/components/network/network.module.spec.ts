import { NetworkModule } from './network.module';

describe('NetworkModule', () => {
  let networkModule: NetworkModule;

  beforeEach(() => {
    networkModule = new NetworkModule();
  });

  it('should create an instance', () => {
    expect(networkModule).toBeTruthy();
  });
});
