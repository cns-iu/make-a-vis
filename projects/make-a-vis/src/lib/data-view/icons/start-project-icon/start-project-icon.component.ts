import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-start-project-icon',
  templateUrl: './start-project-icon.component.html',
  styleUrls: ['./start-project-icon.component.css']
})
export class StartProjectIconComponent implements OnInit {

  showMenu: boolean;

  constructor() {
    this.showMenu = false;
   }

  ngOnInit() {
  }


}
