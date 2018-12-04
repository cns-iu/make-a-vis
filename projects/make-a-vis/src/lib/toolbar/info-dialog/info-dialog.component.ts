import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'mav-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  infoItems: Array<InfoItem>;
  footer: Array<any>;
  headerText: string;
  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.createItems();
      this.headerText = 'IVC Make-A-Vis';
      this.footer = [1, 2, 3]; // TODO: do something to create footer items
    }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close('Thanks for using me!');
  }

  createItems() {
    this.infoItems = [{
      title: 'How to save a project',
      description: '',
      content: ''
    }, {
      title: 'How to make a network graph',
      description: '',
      content: ''
    }, {
      title: 'About Make-A-Vis',
      description: '',
      content: 'Version 0.0.0.1\nRevision Date 11/15/2018'
    }, {
      title: 'Contanct Us',
      description: '',
      content: ''
    }];
  }
}

interface InfoItem {
  title: string;
  description: string;
  content: string;
}
