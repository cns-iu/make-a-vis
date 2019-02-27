import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatIcon,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material';
import { MockComponents } from 'ng-mocks';

import { TableIconComponent } from '../icons/table-icon/table-icon.component';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    const mockComponents = MockComponents(
      MatCard,
      MatCardContent,
      MatCardFooter,
      MatCardHeader,
      MatCardTitle,
      MatCell,
      MatColumnDef,
      MatHeaderCell,
      MatHeaderRow,
      MatHeaderRow,
      MatHeaderRowDef,
      MatIcon,
      MatRow,
      MatRowDef,
      MatTable,
      TableIconComponent
    );

    TestBed.configureTestingModule({
      declarations: [ TableComponent ].concat(mockComponents)
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
