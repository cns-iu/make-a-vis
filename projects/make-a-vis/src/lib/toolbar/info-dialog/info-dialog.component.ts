import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  buildInfo } from './build-info';
@Component({
  selector: 'mav-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})

export class InfoDialogComponent implements OnInit {
  infoItems: Array<InfoItem>;
  footer: Array<any>;
  headerText: string;

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) {
      this.createItems();
      this.headerText = 'IVC Make-A-Vis';
      this.footer = [1, 2, 3]; // TODO: do something to create footer items
    }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
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
      content: {
        'version': buildInfo['version'],
        'lastCommitDate': new Date(buildInfo['lastCommitDate']),
        'buildDate': new Date('buildDate')
      }
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
  content: any;
}
