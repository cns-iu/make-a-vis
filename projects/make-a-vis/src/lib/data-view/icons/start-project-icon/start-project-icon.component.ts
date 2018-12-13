import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-start-project-icon',
  templateUrl: './start-project-icon.component.html',
  styleUrls: ['./start-project-icon.component.scss']
})
export class StartProjectIconComponent implements OnInit {
  isMenuOpen: boolean;
  constructor() {
    this.isMenuOpen = false;
   }
  ngOnInit() {
  }
}
