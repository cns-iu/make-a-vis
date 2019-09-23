import { EdgeSizeModule } from './edge-size.module';

describe('EdgeSizeModule', () => {
  let edgeSizeModule: EdgeSizeModule;

  beforeEach(() => {
    edgeSizeModule = new EdgeSizeModule();
  });

  it('should create an instance', () => {
    expect(edgeSizeModule).toBeTruthy();
  });
});
