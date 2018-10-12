import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-legend-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  legendTypes = ['Nodes', 'Edges', 'States']; // TODO
  recordStreams: any[] = [ // TODO
    {value: 'recordStream1', viewValue: 'Record Stream 1'},
    {value: 'recordStream2', viewValue: 'Record Stream 2'},
    {value: 'recordStream3', viewValue: 'Record Stream 3'}
  ];
  constructor() { }

  ngOnInit() {
  }
}
