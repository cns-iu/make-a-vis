import { NgxDinoModule } from './ngx-dino.module';

describe('NgxDinoModule', () => {
  let ngxDinoModule: NgxDinoModule;

  beforeEach(() => {
    ngxDinoModule = new NgxDinoModule();
  });

  it('should create an instance', () => {
    expect(ngxDinoModule).toBeTruthy();
  });
});
