import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';

import { StartProjectIconComponent } from '../../data-view/icons/start-project-icon/start-project-icon.component';
import { DataTableState } from '../shared/store';
import { TableComponent } from '../table/table.component';
import { MainComponent } from './main.component';

describe('data-view', () => {
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let store: MockStore<{ INITIAL_DATATABLE_STATE: DataTableState }>;
  const initialState = {

    showingDataTableChildren: {
      hiddenChildren: false,
      dataSourceId: ''
    },
    showingDataTableRows: {
      hiddenRows: false,
      dataSourceId: ''
    }
  };
  const mockComponents = MockComponents(
    StartProjectIconComponent,
    TableComponent
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ].concat(mockComponents),
      providers: [ provideMockStore({initialState}) ]
    })
    .compileComponents();

    store = TestBed.inject(Store) as unknown as typeof store;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
});
