import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';
import { OpenedInfoIcon } from '../../shared/store';
import { SidenavState } from '../../../toolbar/shared/store';


@Component({
  selector: 'mav-info-icon',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.scss']
})
export class InfoIconComponent {
  constructor(private dialog: MatDialog, private store: Store<SidenavState>) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mav-info-dialog-container';
    this.dialog.open(InfoDialogComponent, dialogConfig);
    this.store.dispatch(new OpenedInfoIcon({opened: true}));
  }
}
