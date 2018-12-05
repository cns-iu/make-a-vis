import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  buildInfo } from './build-info';
import { stringCompare } from '@ngx-dino/core/lib/common';
@Component({
  selector: 'mav-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
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
    }];
  }

  createAboutusContent() {
    this.aboutusContent = {
      title: 'About Make-A-Vis',
      description: '',
      content: [{'label': 'Version', 'value': buildInfo['version']},
      {'label': 'Last commit Date', 'value': new Date(buildInfo['lastCommitDate']).toLocaleDateString('en-US')},
      {'label': 'Build Date', 'value': new Date(buildInfo['buildDate']).toLocaleDateString('en-US')}]
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
