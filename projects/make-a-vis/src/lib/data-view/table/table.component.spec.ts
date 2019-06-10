import { Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { DataVariable } from '@dvl-fw/core';
import { Store } from '@ngrx/store';
import { map as dinoMap } from '@ngx-dino/core';
import { assign as loAssign, constant as loConstant, map as loMap, memoize as loMemoize } from 'lodash';
import { MockComponents, MockHelper, MockModule, MockRender } from 'ng-mocks';
import { of, Subject } from 'rxjs';

import { DragDropModule } from '../../drag-drop/drag-drop.module';
import { getOpenGVGroupPanelsSelector, isGVPanelOpenSelector } from '../../mav-selection/shared/store';
import { ActionDispatcherService } from '../../shared/services/actionDispatcher/action-dispatcher.service';
import { DataVariableHoverService } from '../../shared/services/hover/data-variable-hover.service';
import { TableIconComponent } from '../icons/table-icon/table-icon.component';
import { DataService, DataSource } from '../shared/data.service';
import { ExportTableService } from '../shared/export-table.service';
import { TableComponent } from './table.component';


interface MockContainer {
  data: DataSource;
  columns: DataVariable[];
  index: number;
}

function createEmptyServices(...tokens: any[]): Provider[] {
  return loMap(tokens, t => ({ provide: t, useFactory: loConstant({ }) }));
}

function getServiceSpy<T>(token: Type<T>, prop: string): jasmine.Spy {
  const service = TestBed.get(token);
  if (service[prop] == null) { service[prop] = jasmine.createSpy(prop); }
  return service[prop];
}

describe('TableComponent', () => {
  const dataSource: DataSource = {
    id: 'table_id', label: 'TestTable', description: 'A test table',
    parent: undefined, children: [{ }] as any, childrenHidden: false,
    columns: [
      { id: 'a', label: 'Col A', recordSet: { id: 'rsid1' } },
      { id: 'b', label: 'Col B', recordSet: { id: 'rsid2' } }
    ] as any,
    data: of([{ a: 1, b: 'foo' }, { a: 2, b: 'bar' }]), level: 0,
    operator: dinoMap(x => x),
    hidden: false, hiddenData: false,
    numRows: 2, streamId: 'sid'
  };
  const memoizedFakeSelect = loMemoize(() => new Subject());

  let component: TableComponent;
  let fixture: ComponentFixture<MockContainer>;

  beforeEach(() => {
    // Reset variables
    memoizedFakeSelect.cache.clear();
  });

  beforeEach(async () => {
    // Setup test bed
    const mockedModules = [MockModule(DragDropModule)];
    const mockedComponents = MockComponents(TableIconComponent);

    TestBed.configureTestingModule({
      imports: [
        MatCardModule, MatIconModule, MatPaginatorModule, MatTableModule
      ].concat(mockedModules as any),
      declarations: mockedComponents.concat([
        TableComponent
      ]),
      providers: createEmptyServices(
        ActionDispatcherService, DataService, DataVariableHoverService, ExportTableService
      ).concat([
        { provide: Store, useValue: { select: memoizedFakeSelect } },
        { provide: DataVariableHoverService, useValue: { hovers: new Subject() } }
      ])
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    // Create components
    fixture = MockRender(`
      <mav-table [dataSource]="data" [displayedColumns]="columns" [tableIndex]="index">
      </mav-table>
    `, { data: loAssign({ }, dataSource), columns: dataSource.columns, index: 0 });

    component = MockHelper.findDirective(fixture.debugElement, TableComponent);
  });

  // Tests
  describe('instance', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('toggleChildTables()', () => {
      let actionSpy: jasmine.Spy;
      let dataSpy: jasmine.Spy;

      beforeEach(() => {
        actionSpy = getServiceSpy(ActionDispatcherService, 'toggleDataTableChildren');
        dataSpy = getServiceSpy(DataService, 'toggleDataTable');
        component.toggleChildTables();
      });

      it('calls the action service', () => {
        expect(actionSpy).toHaveBeenCalled();
      });

      it('provides the data source id and the new toggle state', () => {
        expect(actionSpy).toHaveBeenCalledWith({ dataSourceId: dataSource.id, hiddenChildren: true });
      });

      it('calls the data service', () => {
        expect(dataSpy).toHaveBeenCalled();
      });

      it('provides the data source', () => {
        expect(dataSpy).toHaveBeenCalledWith(dataSource);
      });
    });

    describe('toggleRows()', () => {
      let spy: jasmine.Spy;

      beforeEach(() => {
        spy = getServiceSpy(ActionDispatcherService, 'toggleDataTableRows');
        component.toggleRows();
      });

      it('calls the action service', () => {
        expect(spy).toHaveBeenCalled();
      });

      it('provides the data source id and the new toggle state', () => {
        expect(spy).toHaveBeenCalledWith({ dataSourceId: dataSource.id, hiddenRows: true });
      });

      it('changes the hidden data state', () => {
        expect(component.dataSource.hiddenData).toEqual(true);
      });
    });

    describe('startHover(datavar)', () => {
      const id = 'a';
      const rsid = 'b';
      let spy: jasmine.Spy;

      beforeEach(() => {
        spy = getServiceSpy(DataVariableHoverService, 'startHover');
        component.startHover({ id, recordSet: { id: rsid } } as any);
      });

      it('calls the hover service', () => {
        expect(spy).toHaveBeenCalled();
      });

      it('provides the id and record set id to the service', () => {
        expect(spy).toHaveBeenCalledWith(['table', id, rsid]);
      });
    });

    describe('endHover(datavar)', () => {
      let spy: jasmine.Spy;

      beforeEach(() => {
        spy = getServiceSpy(DataVariableHoverService, 'endHover');
        component.endHover({ } as any);
      });

      it('calls the hover service', () => {
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('exportTable(source)', () => {
      let spy: jasmine.Spy;

      beforeEach(() => {
        spy = getServiceSpy(ExportTableService, 'save');
        component.exportTable(dataSource);
      });

      it('calls the export service', () => {
        expect(spy).toHaveBeenCalledWith(dataSource);
      });
    });

    describe(':hover-event', () => {
      function emitHoverEvent(event: string[]): void {
        const subject: Subject<string[]> = TestBed.get(DataVariableHoverService)['hovers'];
        subject.next(event);
      }

      function test(expected: boolean, id: string, rsid: string): void {
        const result = component.shouldHighlight({ id, recordSet: { id: rsid } } as any);
        expect(result).toEqual(expected);
      }

      it('clears ids on empty events', () => {
        emitHoverEvent([]);
        test(false, 'foo', 'bar');
      });

      it('sets ids on a selector event', () => {
        const id = 'a';
        const rsid = 'b';
        emitHoverEvent(['selector', rsid, id]);
        test(true, id, rsid);
      });
    });

    describe(':hover-enabled', () => {
      async function emitEnabled(id: string, open: boolean): Promise<void> {
        const panelSubject: Subject<boolean> = memoizedFakeSelect.cache.get(isGVPanelOpenSelector);
        const subpanelSubject: Subject<{ streamId: string }[]> = memoizedFakeSelect.cache.get(getOpenGVGroupPanelsSelector);

        panelSubject.next(open);
        subpanelSubject.next([{ streamId: id }]);
        await new Promise(resolve => setTimeout(resolve, 1));
      }

      function test(expected: boolean): void {
        expect(component.hoverEnabled).toEqual(expected);
      }

      it('disables hover when the gv panel isn\'t open', async () => {
        await emitEnabled('abc', false);
        test(false);
      });

      it('disables hover when there is no matching id', async () => {
        await emitEnabled('abc', true);
        test(false);
      });

      it('enables hover when the gv panel is open and there is a matching id', async () => {
        await emitEnabled('sid', true);
        test(true);
      });
    });
  });

  describe('dom', () => {
    function updateDataSource(updates: Partial<DataSource>): void {
      const newDataSource = loAssign({ }, dataSource, updates);
      fixture.componentInstance.data = newDataSource;
      fixture.componentInstance.columns = newDataSource.columns;
      fixture.detectChanges();
    }

    function test(shouldExist: boolean, selector: string): void {
      const element = fixture.debugElement.query(By.css(selector));
      const exists = element != null;
      expect(exists).toEqual(shouldExist);
    }

    function itHasElement(
      selector: string, description: string,
      negData?: Partial<DataSource>, prefix = ''
    ): void {
      const fullSelector = prefix + ' ' + selector;

      it(`has ${selector} when ${description}`, () => {
        test(true, fullSelector);
      });

      if (negData !== undefined) {
        it(`does not have ${selector} when not ${description}`, () => {
          updateDataSource(negData);
          test(false, fullSelector);
        });
      }
    }

    function itReactsTo(
      selector: string, handlerName: keyof TableComponent,
      eventName: string, eventData?: any, prefix = ''
    ): void {
      it(`reacts to ${eventName} on ${selector}`, () => {
        const element = fixture.debugElement.query(By.css(prefix + ' ' + selector));
        const spy = spyOn(component, handlerName as any);
        element.triggerEventHandler(eventName, eventData);
        expect(spy).toHaveBeenCalled();
      });
    }

    describe('.container', () => {
      it('is enabled if data is present', () => {
        test(true, '.container');
      });

      it('is disabled if no data is present', () => {
        fixture.componentInstance.data = undefined;
        fixture.detectChanges();
        test(false, '.container');
      });

      it('can be hidden', () => {
        updateDataSource({ hidden: true });
        test(true, '.hidden');
      });

      itHasElement('.header', 'always');
      itHasElement('.content', 'always');
      itHasElement('.footer', 'always');
    });

    describe('.header', () => {
      function itHasHeaderElement(
        selector: string, description: string, negData?: Partial<DataSource>
      ): void { itHasElement(selector, description, negData, '.header'); }

      function itHeaderReactsTo(
        selector: string, handlerName: keyof TableComponent,
        eventName: string, eventData?: any
      ): void { itReactsTo(selector, handlerName, eventName, eventData, '.header'); }

      itHasHeaderElement('.toggle-icon', 'sub-tables', { children: [] });
      itHasHeaderElement('.label', 'always');
      itHasHeaderElement('.description', 'non-empty description', { description: undefined });
      itHasHeaderElement('.export-to-csv-icon', 'always');

      itHeaderReactsTo('.toggle-icon', 'toggleChildTables', 'click');
      itHeaderReactsTo('.export-to-csv-icon', 'exportTable', 'click');
    });

    describe('.content', () => {
      function itHasContentElement(
        selector: string, description: string, negData?: Partial<DataSource>
      ): void { itHasElement(selector, description, negData, '.content'); }

      function itContentReactsTo(
        selector: string, handlerName: keyof TableComponent,
        eventName: string, eventData?: any
      ): void { itReactsTo(selector, handlerName, eventName, eventData, '.content'); }

      itHasContentElement('.table', 'always');

      itContentReactsTo('.header-cell', 'startHover', 'mouseover');
      itContentReactsTo('.header-cell', 'endHover', 'mouseout');
    });

    describe('.footer', () => {
      function itHasFooterElement(
        selector: string, description: string, negData?: Partial<DataSource>
      ): void { itHasElement(selector, description, negData, '.footer'); }

      function itFooterReactsTo(
        selector: string, handlerName: keyof TableComponent,
        eventName: string, eventData?: any
      ): void { itReactsTo(selector, handlerName, eventName, eventData, '.footer'); }

      itHasFooterElement('.paginator', 'always');
      itHasFooterElement('.toggle-icon', 'always');

      itFooterReactsTo('.record-toggle-group', 'toggleRows', 'click');
    });
  });
});
