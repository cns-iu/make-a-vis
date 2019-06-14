import { NodeSizeModule } from './node-size.module';

describe('NodeSizeModule', () => {
  let nodeSizeModule: NodeSizeModule;

  beforeEach(() => {
    nodeSizeModule = new NodeSizeModule();
  });

  it('should create an instance', () => {
    expect(nodeSizeModule).toBeTruthy();
  });
});
