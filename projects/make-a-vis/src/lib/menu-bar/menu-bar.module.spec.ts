import { MenuBarModule } from './menu-bar.module';

describe('MenuBarModule', () => {
  let menuBarModule: MenuBarModule;

  beforeEach(() => {
    menuBarModule = new MenuBarModule();
  });

  it('should create an instance', () => {
    expect(menuBarModule).toBeTruthy();
  });
});
