import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-selection-graphic-symbol-type',
  templateUrl: './graphic-symbol-type.component.html',
  styleUrls: ['./graphic-symbol-type.component.css']
})
export class GraphicSymbolTypeComponent implements OnInit {
  graphicSymbolTypes = ['Record(Area)', 'Link(line)']; // TODO: temporary placeholder

  constructor() { }

  ngOnInit() {
  }

}
