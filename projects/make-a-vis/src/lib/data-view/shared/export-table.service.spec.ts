import { TestBed } from '@angular/core/testing';
import { map as dinoMap } from '@ngx-dino/core';
import * as fileSaver from 'file-saver';
import * as papaparse from 'papaparse';
import { of } from 'rxjs';

import { DataSource } from './data.service';
import { ExportTableService } from './export-table.service';

describe('ExportTableService', () => {
  const dataSource = {
    columns: [{ id: 'a', label: 'foo' }, { id: 'b', label: 'bar' }],
    data: of([{ a: 1, b: 2 }, { a: 3, b: 4 }]),
    operator: dinoMap(x => x),
    id: 'id',
    label: 'label',
    parent: undefined,
    children: [],
    childrenHidden: false,
    level: 0,
    hidden: false,
    hiddenData: false,
    numRows: 0,
    streamId: 'streamId'
  } as DataSource;

  let service: ExportTableService;
  let saveAsSpy: jasmine.Spy;
  let unparseSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    service = TestBed.get(ExportTableService);
    saveAsSpy = spyOn(fileSaver, 'saveAs');
    unparseSpy = spyOn(papaparse, 'unparse').and.returnValue('');
  });

  beforeEach(() => {
    service.save(dataSource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calls unparse to turn data into csv', () => {
    expect(unparseSpy).toHaveBeenCalled();
  });

  it('calls saveAs to save the csv to file', () => {
    expect(saveAsSpy).toHaveBeenCalled();
  });
});
