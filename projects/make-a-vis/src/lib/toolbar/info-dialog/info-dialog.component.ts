import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { buildInfo } from './build-info';


@Component({
  selector: 'mav-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
  infoItems: Array<InfoItem>;
  footer: Array<any>;
  headerText: string;
  aboutusContent: any;
  contactusContent: any;

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>) {
    this.createItems();
    this.createAboutusContent();
    this.createContactusContent();
    this.headerText = 'Make-a-Vis';
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
    }];
  }

  createAboutusContent() {
    this.aboutusContent = {
      title: 'About Make-A-Vis',
      description: '',
      content: [
        {'label': 'Version', 'value': buildInfo.version},
        {'label': 'Revision Date', 'value':  buildInfo.lastCommitDate.toLocaleDateString()},
        {'label': 'Build Date', 'value': buildInfo.buildDate.toLocaleDateString()}
      ]
    };
  }

  createContactusContent() {
    this.contactusContent =  {
      title: 'Contact Us',
      description: '',
      content: []
    };
  }
}

interface InfoItem {
  title: string;
  description: string;
  content: any;
}
