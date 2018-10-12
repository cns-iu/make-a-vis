import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-legend-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  legendTypes = ['Nodes', 'Edges', 'States'];
  constructor() { }

  ngOnInit() {
  }
}
