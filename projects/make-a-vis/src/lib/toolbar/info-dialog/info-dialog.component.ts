import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { SidenavState } from '../../toolbar/shared/store';
import { ClosedInfoIcon } from '../shared/store';
import { buildInfo } from './build-info';



@Component({
  selector: 'mav-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {
  infoItems: Array<InfoItem>;
  footer: Array<any>;
  headerText: string;
  aboutusContent: any;
  contactusContent: any;

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>, private store: Store<SidenavState>) {
    this.createItems();
    this.createAboutusContent();
    this.createContactusContent();
    this.headerText = 'Make-a-Vis';
  }

  close() {
    this.dialogRef.close();
    this.store.dispatch(new ClosedInfoIcon({opened: false}));
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
