import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';

@Component({
  selector: 'mav-info-icon',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.css']
})
export class InfoIconComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'nopadding-dialog-container';

    this.dialog.open(InfoDialogComponent, dialogConfig);
  }

}
