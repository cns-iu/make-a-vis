import { ToolbarModule } from './toolbar.module';

describe('ToolbarModule', () => {
  let toolbarModule: ToolbarModule;

  beforeEach(() => {
    toolbarModule = new ToolbarModule();
  });

  it('should create an instance', () => {
    expect(toolbarModule).toBeTruthy();
  });
});
