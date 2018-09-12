import { Component, OnInit, ViewChild } from '@angular/core';
import { ExportProjectEvent} from '../shared/events';
import { SidenavEvent } from '../shared/events';
import { SidenavService } from '../../../lib/shared/services/sidenav/sidenav.service';

@Component({
  selector: 'mav-toolbar',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('scatterplot') scatterplot;
  isSidenavOpen = false;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
  }

  setSidenavState(event: boolean) {
    this.isSidenavOpen = event;
  }

  sideNavChanged(event: SidenavEvent) {

    if (event.type === 'export') {

      switch (event.imageFormat) {
        case 'png' : {

            this.sidenavService.exportToPng(document.getElementsByTagName('dino-scatterplot')[0].querySelector('svg'), 'myPng.png');

        }



      }


    }



  }
}
