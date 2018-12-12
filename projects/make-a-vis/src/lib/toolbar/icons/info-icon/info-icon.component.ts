import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';

@Component({
  selector: 'mav-info-icon',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.css']
})
export class InfoIconComponent {

  constructor(private dialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mav-info-dialog-container';
    this.dialog.open(InfoDialogComponent, dialogConfig);
  }
}
