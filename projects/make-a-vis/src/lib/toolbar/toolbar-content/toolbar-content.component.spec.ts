import { Provider, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { MockComponents } from 'ng-mocks';
import { InfoIconComponent } from '../icons/info-icon/info-icon.component';
import { MenuIconComponent } from '../icons/menu/menu-icon.component';
import { ToolbarContentComponent } from './toolbar-content.component';
import { Unsubscribable } from 'rxjs';

describe('ToolbarContentComponent', () => {
  const mockedStore = { pipe: () => ({ subscribe: (): Unsubscribable => ({ unsubscribe: () => undefined})})};
  let component: ToolbarContentComponent;
  let fixture: ComponentFixture<ToolbarContentComponent>;

  beforeEach(async(() => {
    const mockedComponents: Type<any>[] = MockComponents(
      InfoIconComponent,
      MenuIconComponent
    );
    const mockedProviders: Provider[] = [
      { provide: Store, useValue: mockedStore}
    ];

    TestBed.configureTestingModule({
      imports: [
        MatIconModule, MatToolbarModule
      ],
      declarations: [ ToolbarContentComponent ].concat(mockedComponents),
      providers: mockedProviders
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isSidenavOpen).toBeFalsy();
  });
});
